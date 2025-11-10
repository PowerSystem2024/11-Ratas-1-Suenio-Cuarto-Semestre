import utils
import read_csv
import charts
import pandas as pd

def run():
    '''
    data = read_csv.read_csv('./data.csv') # leemos el csv, gracias al modulo linea 2
    data = list(filter (lambda item: item['Continent'] == 'South America', data))

    countries = list(map (lambda x: x['Country'], data))
    percentages = list(map (lambda x: x[ 'World Population Percent'], data))
    charts.generate_pie_chart (countries, percentages)
'''
    
    df = pd.read_csv ('data.csv') #estamos leyendo el archivo csv
    df = df[df ['Continent']== 'Africa']
    countries =df ['Country'].values
    percentages = df['world Population Percentage'].values
    charts.generate_pie_chart (countries, percentages)

    data = read_csv.read_csv('./data.csv')
    country = input('Type Country => ')
    print(country)

    result = utils.population_by_country(data, country)
    if len(result) > 0:
        country = result[0]