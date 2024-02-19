import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from flask import Flask, request, render_template
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

app = Flask("__name__")
api = Api(app)

CORS(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
parser = reqparse.RequestParser()
parser.add_argument('cgpa')
parser.add_argument('degree')
parser.add_argument('educationGap')
parser.add_argument('internship')
parser.add_argument('liveBacklog')
parser.add_argument('tenth')
parser.add_argument('twelth')
parser.add_argument('yearDown')

q= ""

@app.route("/")
def load_page():
    return render_template("home.html", query="")


@app.route("/", methods=['POST'])
def Employability_Prediction():
    dataset_url = r"./Final_Data.csv"
    df = pd.read_csv(dataset_url)

    df.info()

    inputQuery1 = request.form['query1']
    inputQuery2 = request.form['query2']
    inputQuery3 = request.form['query3']
    inputQuery4 = request.form['query4']
    inputQuery5 = request.form['query5']
    inputQuery6 = request.form['query6']
    inputQuery7 = request.form['query7']
    inputQuery8 = request.form['query8']


    X = df[['Class 10 Percentage', 'Class 12 Percentage',
       'Degree Percentage', 'Degree CGPA', 'Live Backlogs', 'Education Gap',
       'Year down', 'Internship Details']]
    Y = df['Placed In']

    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    clf=RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    clf.fit(x_train,y_train)

    y_pred=clf.predict(x_test)
    accuracy_score(y_test,y_pred)
    data = [[inputQuery1, inputQuery2, inputQuery3, inputQuery4, inputQuery5, inputQuery6, inputQuery7, inputQuery8]]
    
    
    # Create the pandas DataFrame 
    new_df = pd.DataFrame(data, columns=['Class 10 Percentage', 'Class 12 Percentage', 'Degree Percentage',
       'Degree CGPA', 'Live Backlogs', 'Education Gap', 'Year down',
       'Internship Details'])
    
    single = clf.predict(new_df)
    probability = clf.predict_proba(new_df)[:,1]
    print(probability)

    if single == 1:
        output = "You have good chances of Employability"
        output1 = "Your Employability score is:  {}".format(probability*100)
    else:
        output = "You can still improve of Employability"
        output1 = "Your Employability score is:  {}".format(probability*100)


    # if probability >= 50 and probability<=70:
    #     output = "You have good chances of Employability"
    #     output1 = "Your  {}".format(probability*100)
    # elif probability >=30 & probability <= 50:
    #     output = "You can still improve of Employability"
    #     output1 = "Your  {}".format(probability*100)
    # else: 
    #     output = "You really need to improve your Employability"
    #     output1 = "Confidence: {}".format(probability*100)

    
    return render_template('home.html', output1=output, output2=output1, query1 = request.form['query1'], query2 = request.form['query2'],query3 = request.form['query3'],
                           query4 = request.form['query4'],query5 = request.form['query5'], query6 = request.form['query6'],
                           query7 = request.form['query7'], query8 = request.form['query8'])

class Employ(Resource):

    def post(self):
        args = parser.parse_args()
        print(args)
        cgpa = args['cgpa']
        degree = args['degree']
        educationGap = args['educationGap']
        internship = args['internship']
        livebacklog = args['liveBacklog']
        tenth = args['tenth']
        twelth = args['twelth']
        yearDown = args['yearDown']
        dataset_url = r"./Final_Data.csv"
        df = pd.read_csv(dataset_url)

        df.info()

        inputQuery1 = int(tenth)
        inputQuery2 = int(twelth)
        inputQuery3 = int(degree)
        inputQuery4 = float(cgpa)
        inputQuery5 = livebacklog
        inputQuery6 = educationGap
        inputQuery7 = yearDown
        inputQuery8 = internship


        X = df[['Class 10 Percentage', 'Class 12 Percentage',
        'Degree Percentage', 'Degree CGPA', 'Live Backlogs', 'Education Gap',
        'Year down', 'Internship Details']]
        Y = df['Placed In']

        x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

        clf=RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
        clf.fit(x_train,y_train)

        y_pred=clf.predict(x_test)
        accuracy_score(y_test,y_pred)
        data = [[inputQuery1, inputQuery2, inputQuery3, inputQuery4, inputQuery5, inputQuery6, inputQuery7, inputQuery8]]
        print([inputQuery1, inputQuery2, inputQuery3, inputQuery4, inputQuery5, inputQuery6, inputQuery7, inputQuery8])
        
        # Create the pandas DataFrame 
        new_df = pd.DataFrame(data, columns=['Class 10 Percentage', 'Class 12 Percentage', 'Degree Percentage',
        'Degree CGPA', 'Live Backlogs', 'Education Gap', 'Year down',
        'Internship Details'])
        
        single = clf.predict(new_df)
        probability = clf.predict_proba(new_df)[:,1]
        print(probability)

        if single == 1:
            output = "You have good chances of Employability"
            output1 = "Your Employability score is:  {}".format(probability*100)
        else:
            output = "You can still improve of Employability"
            output1 = "Your Employability score is:  {}".format(probability*100)
        
        return {'Employability': output, 'Score': output1}, 200

api.add_resource(Employ, '/score')

app.run(debug=True)