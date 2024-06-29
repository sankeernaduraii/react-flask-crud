from math import ceil
from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["SudentsDB"]
collection = db["Students"]

@app.route('/addStudent',methods=["POST"])
def index():
    data = request.json
    name = data.get("name")
    rollno = data.get("rollno")
    age = data.get("age")
    dept = data.get("department")
    year = data.get("year")
    if not name or not rollno or not age or not dept or not year:
        return jsonify({"Error":"Please enter all fields"}),400
    student_data = {
        "name" : name,
        "rollno" : rollno,
        "age": int(age),
        "department":dept,
        "year": int(year)
    }
    collection.insert_one(student_data)
    return jsonify({"Message":"Data inserted in database successfully"}),200

@app.route('/retrieveStudents',methods=["GET"])
def retrieveStudent():
    page = int(request.args.get("page"))
    students = list(collection.find({}).skip((page-1)*60).limit(60))
    count = collection.count_documents({})
    maxpage = ceil(count/60)
    for student in students:
        student['_id'] = str(student['_id'])
    return jsonify({"Students":students,"count":count,"maxpage":maxpage}),200

@app.route('/retrieve_departments',methods=['GET'])
def retrieve_departments():
    departments = (collection.distinct('department'))
    return jsonify({"departments":departments}),200

@app.route('/studentDetailsInParticularDepartment',methods=['GET'])
def studentDetailsInParticularDepartment():
    department = request.args.get("department")
    page = int(request.args.get("page"))
    if not department: 
        return jsonify({"Error": "Please enter department name"}),400
    if not page:
        return jsonify({"message":"Please enter page number"}),400
    students = list(collection.find({'department': department}).skip((page-1)*32).limit(32))
    count = collection.count_documents({'department':department})
    maxpage = ceil(count/32)
    for student in students:
        student['_id'] = str(student['_id'])
    return jsonify({"Students":students,"maxpage":maxpage,"count":count}),200

@app.route('/year',methods=['GET'])
def year():
    years = list(collection.distinct('year'))
    return jsonify({"Years":years}),200

@app.route("/studentDetailsInParticularYear",methods=['GET'])
def studentDetailsInParticularYear():
    year = request.args.get("year")
    page = int(request.args.get("page"))
    year = int(year)
    if not year:
        return jsonify({"Error":"Please enter a year"}),400
    if not page:
        return jsonify({"Error":"Please enter a page number"}),400
    stdDetails = list(collection.find({"year":year}).skip((page-1)*32).limit(32))
    count = collection.count_documents({'year':year})
    maxpage = ceil(count/32)
    for stdDetail in stdDetails:
        stdDetail['_id'] = str(stdDetail['_id'])
    return jsonify({"StudentDetails":stdDetails,"count":count,"maxpage":maxpage}),200

@app.route("/deleteStudent/<string:id>",methods=['DELETE'])
def deleteStudent(id):
    if not id:
        return jsonify({"Error":"please enter a id"})
    id=ObjectId(id)
    result = collection.delete_one({"_id":id})
    if result.deleted_count == 1:
        student = list(collection.find({}))
        for std in student:
            std["_id"] = str(std["_id"])
        student_details = {
            "Message":"Deleted Successfully",
            "std_data": student
        }
        return jsonify({"StudentDetails":student_details}),200
    return jsonify({"Message":"No Students record were found"}),404

@app.route("/deleteStudentDeptWise/<string:dept>/<string:id>", methods=["DELETE"])
def delete_student_year_wise(dept, id):
    if not dept:
        return jsonify({"Error": "Please enter a department"})
    if not id:
        return jsonify({"Error": "Please enter an ID"})
    id = ObjectId(id)
    result = collection.delete_one({"department": dept, "_id": id})
    if result.deleted_count == 1:
        count = collection.count_documents({"department": dept})
        student = list(collection.find({"department": dept}))
        for std in student:
            std["_id"] = str(std["_id"])
        
        return jsonify({"Message": "Successfully deleted", "count": count,"Students":student}), 200
    
    return jsonify({"Message": "No records found"}), 404

@app.route("/deleteStudentYearWise/<int:year>/<string:id>", methods=["DELETE"])
def delete_student_dept_wise(year, id):
    if not year:
        return jsonify({"Error": "Please enter a department"})
    if not id:
        return jsonify({"Error": "Please enter an ID"})
    year = int(year)
    id = ObjectId(id)
    result = collection.delete_one({"year": year, "_id": id})
    if result.deleted_count == 1:
        count = collection.count_documents({"year": year})
        student = list(collection.find({"year": year}))
        for std in student:
            std["_id"] = str(std["_id"])
        
        return jsonify({"Message": "Successfully deleted", "count": count,"Students":student}), 200
   
    return jsonify({"Message": "No records found"}), 404

@app.route("/findById/<string:id>",methods=["GET"])
def findById(id):
    if not id:
        return jsonify({"Message":"Enter an Id"}),404
    id=ObjectId(id)
    result = list(collection.find({"_id":id}))
    for std in result:
            std["_id"] = str(std["_id"])
    if result:
        return jsonify({"Result":result}), 200
    return jsonify({"Result":"No records found"}), 404


@app.route("/updateStudent/<string:id>",methods=['PUT'])
def updateStudent(id):
    if not id:
        return jsonify({"Error":"please enter a id"}),400
    data = request.json
    name = data.get("name")
    age = data.get("age")
    rollno = data.get("rollno")
    year = data.get("year")
    department = data.get("department")
    if not department or not year or not rollno or not age or not name:
        return jsonify({"Error":"All fields must be provided"}),400
    new_data = {
        "name":name,
        "age":age,
        "rollno":rollno,
        "department":department,
        "year":int(year)
    }
    id = ObjectId(id)
    result = collection.update_one({"_id":id},{'$set': new_data})
    if result:
        return jsonify({"Message":"Successfully updated"}),200
    return jsonify({"Message":"Student not found"}),404
    
@app.route("/retrieveYearAndDept/<year>/<department>",methods = ['GET'])
def retrieveYearAndDept(year,department):
        if not year:
            return jsonify({"error":"please enter a year"}),400
        if not department:
            return jsonify({"error":"please enter a department"}),400
        year = int(year)
        student =  list(collection.find({'year':year,'department':department}))
        if student:
            for std in student:
                std["_id"] = str(std["_id"])
            return jsonify({"Message":"Successfully sent the data","Students":student}),200
        return jsonify({"Error":"No data found"}),400


    

if __name__ == '__main__':
    app.run(debug=True,port = 8000)


