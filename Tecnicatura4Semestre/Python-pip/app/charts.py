import matplotlib.pyplot as plt

def generate_bar_chart(name, labels, values):
    fig, ax = plt.subplots()
    ax.bar(labels, values)
    plt.savefig(f'./img/{name}.png')
    plt.close()

def generate_pie_chart (labels, valu):
    fig, ax = plt.subplots()
    ax.pie(values, labels=labels)
    ax.axis('equal')
    plt.savefig('charts_pie_es_una_prueba.png')
    plt.close()

if __name__ == '__main__':
    labels = ['a', 'b', 'c']
    values = [10, 40, 800]
    # generate_bar_chart (labels, values)
    generate_pie_chart (labels, values)(env)
