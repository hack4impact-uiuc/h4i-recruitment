from pyschedule import Scenario, solvers, plotters, alt
import json
from itertools import combinations
import random
import datetime
import json
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
    resource_list.append(S.Resource(name_list[i].replace(" ",""),length=1,periods=[getPeriodFromTime(t) for t in data['times'][i]['availableTimes']]))
    
for i in range(len(name_list2)):
    task_list.append(S.Task(name_list2[i].replace(" ",""),length=1,periods=[getPeriodFromTime(t) for t in data2['times'][i]['availableTimes']]))

name_perms = list(combinations(range(len(name_list)),2))
final = [[S.resources()[x[0]],S.resources()[x[1]]] for x in name_perms]

for t in task_list:
    random.shuffle(resource_list)
    t += alt(resource_list[:10]), alt(resource_list[10:])


# compute and print a schedule

solvers.mip.solve(S,random_seed=random.randint(1,1000))
soln = S.solution()
interviewList = []
for s in range(0,len(soln),2):
    # assert names & times match before merging
    assert(soln[s][0] == soln[s+1][0])
    assert(soln[s][2] == soln[s+1][2])
    interview = {}
    interview["name"] = str(soln[s][0])
    interview['interviewers'] = [str(soln[s][1]),str(soln[s+1][1])]
    interview['start_time'] = data['allTimes'][soln[s][2]] 
    interview['duration'] = data['interviewDuration']
    interviewList.append(interview)

print(json.dumps(interviewList))
plotters.matplotlib.plot(S,img_filename='test4.png')


