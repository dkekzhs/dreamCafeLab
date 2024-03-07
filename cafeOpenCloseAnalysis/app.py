from flask import Flask, render_template

from csvAnalysis.filterCSV import filter_cafe_by_year_and_area

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route("/analysis/<year>/<area>")
def analysis(year, area):
    try:
        filter_cafe_by_year_and_area("./dat", year, area)
        return "Finished"
    except Exception as e:
        return render_template('error.html', error=str(e))


if __name__ == '__main__':
    app.run()
