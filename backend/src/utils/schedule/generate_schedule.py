from pyschedule import Scenario, solvers, plotters, alt
import json
from itertools import combinations
import random
with open('mock.json') as f:
    data = json.load(f)

with open('mock2.json') as g:
    data2 = json.load(g)

name_list = [i['name'] for i in data['times']]
name_list2 = [i['name'] for i in data2['times']]
def getPeriodFromTime(time):
    return data['allTimes'].index(time)
print(name_list)
# the planning horizon has n periods
S = Scenario('household',horizon=len(data['allTimes']))
resource_list = []
task_list = []
for i in range(len(name_list)):
    resource_list.append(S.Resource('R'+name_list[i].replace(" ",""),length=1,periods=[getPeriodFromTime(t) for t in data['times'][i]['availableTimes']]))
    
for i in range(len(name_list2)):
    task_list.append(S.Task('T'+name_list2[i].replace(" ",""),length=1,periods=[getPeriodFromTime(t) for t in data2['times'][i]['availableTimes']]))

name_perms = list(combinations(range(len(name_list)),2))
final = [[S.resources()[x[0]],S.resources()[x[1]]] for x in name_perms]

for t in task_list:
    random.shuffle(resource_list)
    t += alt(resource_list[:10]), alt(resource_list[10:])


# compute and print a schedule

solvers.mip.solve(S,random_seed=random.randint(1,1000))
soln = S.solution()

plotters.matplotlib.plot(S,img_filename='test4.png')


