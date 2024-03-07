import pandas as pd


output = pd.read_csv('ee.csv')
df_output = pd.DataFrame(output)
df_output = df_output.drop_duplicates()  # 중복 데이터 제거
df_output.to_csv('real_estate_list.csv', index=False)