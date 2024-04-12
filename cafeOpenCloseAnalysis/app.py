from flask import Flask, render_template

from csvAnalysis.filterCSV import filter_cafe_by_year_and_area, filter_open_close, calculate_statistics, \
    assign_trade_area_id, calculate_percentage, save_to_csv
from csvAnalysis.insertDB import insertDB

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route("/analysis/<year>/<area>")
def analysis(year, area):
    try:
        filter_cafe_by_year_and_area("./dat", year, area)
        return year + "/" + area + "/" + "Finished"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))

@app.route("/analysis/duration")
def analysis_duration():
    try:
        filter_open_close()
        return "duration analysis finished"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))

@app.route("/analysis/stats")
def analysis_stats():
    try:
        calculate_statistics()
        return "통계 작업 완료"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))

@app.route("/analysis/insertToDB")
def insertToDB():
    try:
        insertDB("./ret/duration/")
        return "성공적으로 DB 삽입 수행"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))


@app.route("/analysis/sangun")
def analysisSangun():
    try:
        assign_trade_area_id("./dat/area.geojson", "./ret/duration", "./ret/test")
        return "성공적으로 상권 구분"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))

@app.route("/analysis/sangun/openclose")
def analysisSangunOpenClose():
    try:

        # 백분율 계산
        ret = calculate_percentage("./ret/test")
        # 결과를 CSV 파일로 저장
        save_to_csv(ret[0], ret[1], ret[2], "./ret/percentage/data_by_trade_area.csv")
        return "성공적으로 상권 구분"
    except Exception as e:
        print("에러 발생 ", e)
        return render_template('error.html', error=str(e))

if __name__ == '__main__':
    app.run()
