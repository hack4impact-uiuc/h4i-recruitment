var mongoose = require('mongoose')
const Candidate = require('../models/candidate')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const populateDB = async () => {
  var newCandidate = new Candidate({
    name: 'Tim',
    email: 'example@abc.com',
    graduationDate: 'Spring 2021',
    status: 'Rejected',
    major: 'CompE',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Tech Lead'],
    githubContributions: 'N/A',
    year: 'Junior',
    classesTaken: '',
    roleReason: '',
    joinReason: '',
    timeCommitment: '',
    techExperience: '',
    howTheyKnowUs: '',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Sharkira',
    email: 'example@abc.com',
    graduationDate: 'Spring 2023',
    status: 'Pending',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '194',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      'I chose software developer because I want to focus on programming and improve my skills, while also learning more about the design process. I am a good fit for this role because I have taken all the essential programming courses and have had industry experience in building a web app from the ground up using current technologies and practices.',
    joinReason: 'I hope learn while also being able to give back.',
    timeCommitment: 'Hack Illinois',
    techExperience: 'Partial(https://github.com/ahmedammar841/Partial), CS 125, CS 126',
    howTheyKnowUs: 'Info Session',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Gillfunkel',
    email: 'example@abc.com',
    graduationDate: 'Spring 2021',
    status: 'Pending',
    major: 'CS',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: '201',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      "I've selected to apply for the Software Developer role because I’d love the opportunity to grow as a programmer and work on a team to develop something tangible. As a freshman majoring in CS + Ling, I’m always motivated to explore new and exciting ways to not only learn but also to contribute, and that holds especially true since I consider myself to be a relatively beginner-level coder. Nonetheless, becoming a Software Developer for Hack4Impact is a prospect that really excites me!",
    joinReason:
      "Up to now most of my projects are personal projects, which means it's the end of story when they were finished. I want to build things that people will actually use as products, that will have real-world impact. I hope my communication and cooperation skills will be improved through the team work at Hack4Impact.",
    timeCommitment: 'Class: CS425, CS374, CS411, CS543, Org: CESA project committee member',
    techExperience:
      "Classes taken: CS125, CS126, CS173, CS225, CS233, CS241, CS296-41, CS357, CS446, STAT400, STAT410 Projects: DSSHFS - a distributed ssh file system.link: https://github.com/zd-project/sshfs_cs241honor UIUC Course Review - an Android app for looking up course info and write / read course reviews.no link available Reddit Score Predictor - a predictive model for scores of reddit posts based on posts' content. link: https://github.com/andyclee/redditSentiment Fake News Detection - a classification model for classifying news as agree, disagree, discuss and unrelated based on news body and news title.no link available. RideFinder - currently developing a ride finder mini - program based on weChat, the most popular social app in China.no link available.",
    howTheyKnowUs: 'Facebook',
    additionalComments: "I'm ok with web projects but would prefer data science projects. "
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Tim',
    email: 'example@abc.com',
    graduationDate: 'Fall 2020',
    status: 'Accepted',
    major: 'CompE',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: 'N/A',
    year: 'Freshman',
    classesTaken: '',
    roleReason: '',
    joinReason: '',
    timeCommitment: '',
    techExperience: '',
    howTheyKnowUs: '',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Cod Stweart',
    email: 'example@abc.com',
    graduationDate: 'Spring 2020',
    status: 'Rejected',
    major: 'CS + Linguistics',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: '15',
    year: 'Freshman',
    classesTaken: '',
    roleReason:
      'The role I’m applying for is the software developer position, and I would be a good fit because I maintain an open-mind for learning and am ready to use the skills I have for a cause. As a computer science major, I have already taken numerous classes where I was able to learn and practice problem-solving with languages such as C, C++, Java and also front-end languages like JavaScript. Although most of the classes I have taken in CS have been core classes, I am excited to expand my abilities to more specific areas with both electives, but also extracurricular project experience—which I believe Hack4Impact could provide. I am also motivated by purpose, meaning that I am more productive and efficient when I am able to see the reason why I am working clearly. If I am accepted into Hack4Impact, I am sure that I would be able to bring my best work forward since I understand that what I am doing has a bigger impact than just my grades.  ',
    joinReason:
      "Last summer, I moved to California to work at Intel for a co-op. It was an incredible work experience, but I realized I'm not very passionate about chipsets and microprocessors. I've been hustling through CS classes, grooming myself to be a developer in Silicon Valley, but realizing lately that I am most passionate about the work I do that has social impact. Hopefully this gives me a taste of what it's like to combine my skillset with my passions and better serve the community of people around me.",
    timeCommitment:
      'Full course load, pretty heavy involvement in CFC/church events, HackIllinois Media, job interviews for summer intermnships',
    techExperience:
      'A few internships, a data visualization independent study with Wade Fagen, a few terrible classes. You can find most of it on my resume.',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments:
      "I'm sincerely excited about the prospect of joining Hack4Impact, but this semester is already brutal and I don't want to bite off more than I can chew. Maybe I can chat with Alvin/n and see if there's any way I can still contribute meaningfully with the limited time I have."
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'James Pong',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Pending',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '33',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      "In the past I've done android development, back end and front end development. My knowledge in Flask and SQLAlchemy could also be very useful in my role as a software developer. I believe my skills are of good foundations to make an impact at Hack4Impact. Tech Lead is also another role I'm intersted in. Although I have no prior experience as a tech lead, I am interested in planning out the outlines for projects and confidently leading my team. I believe that by being in the software developer or tech lead role at Hack4Impact, I would further expand my technical skills as well as improve my teamwork and management abilities. ",
    joinReason:
      'For me, the best way to learn is to dirty my hands and be able to apply the theory into a practical implementation. Hack4impact provides me the best opportunity to serve the community by helping solve real world problems while growing up as a software developer. As a undergrad student of computer science, this is dream come true.',
    timeCommitment: 'CS 126, CS 225, CS 173, Math 415',
    techExperience:
      '3 month Internship at eRx Solutions startup,  CS 125, CS 196 Honors Project Class (Developed a Fitness Mobile Application), PURE Undergraduate research (Developed a platform for Crowd Sourced Feedback)',
    howTheyKnowUs: 'Info Session',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Swim shady',
    email: 'example@abc.com',
    graduationDate: 'Spring 2023',
    status: 'Pending',
    major: 'Statistics and Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Software Developer'],
    githubContributions: '46',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      "I love problem solving and delivering customer centric solutions. As of late, the challenges I've been most interested in taking on have consistently related to addressing societal and student struggles (mental health, leadership, Facebook depression). I've been apart of countless teams, but more importantly been apart of the internal development process for many of my peers - whether it be on a sports team or a technical team. I am able to look beyond simply achieving the end goal, but also making sure that the journey is just as valuable - which I believe is especially critical for a team of what I assume will be less experienced developers.",
    joinReason: 'I would like to learn as much as I can and gain all the experience I can.',
    timeCommitment: 'HackIllinois and CS 125 CA',
    techExperience:
      "Classes: - CS 125 -CS 126 -CS 173 -CS 196 Projects: XCram: a study plan app that compiles a week's worth of content given a topic to study for. BackBeat: a new take on the metronome, with features that tell the user exactly where they deviate from the needed tempo. Keyboard Hero: A web version of GuitarHero where the user can program their own song. HomEats: A web application that connects local home cooks to hungry individuals.Utilizing the Google maps API for web we created a user interface through React.js and retain user information, we connected our project to FireBase. - https://k-ravuri.github.io/",
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'cousin Finny',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Pending',
    major: 'Finance',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Tech Lead'],
    githubContributions: 'N/A',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      "I'm passionate about learning new technologies and applying my skills to build things that people will use. Software Developer is the role that creates products and that's why I apply for it.",
    joinReason:
      'I just want friends im sad and lonely do you ever feel like a plastic bag driftin through the wind wanting to start again do you ever feel like mans not hot check your nose fam you donut nose long like garden hose i tell her mans not hot i tell her mans not hot she told me take off your jacket i said babes mans not hot',
    timeCommitment:
      'School. Sleep. Eating. Some clubs. Sometimes a job. Trying to exercise but not really.',
    techExperience:
      "Cs 105. I learned how to use excel and 'code' in javascript aka coffee writing but not actually cause i got this sucker to do all my mps for me his name is edward do you know him well i d8dnt force him but he got so frustrated trying to explain to me what was going on that he just ended up doing it",
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: 'Hi kirti and alvin'
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Anchovie Hopkins',
    email: 'example@abc.com',
    graduationDate: 'Fall 2021',
    status: 'Pending',
    major: 'Computer Engineering',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: 'N/A',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      'I am applying for the community director position because I am really passionate about leadership. I value the culture of an organization and I hope to make a contribution to the team. I would be a good fit for this position because 1) I understand that a leader is not a position but a process. I am willing to put into efforts and build a community among the members. 2) I am organized but also creative. I will make sure to have all the events in order, and make them fun for all the members. 3) I care for productivity. I believe that being able to balance work and leisure is crucial to an individual and a team’s success. So I will try my best to be helpful within the community. ',
    joinReason:
      "As a freshman, I haven't been able to get involved in as many volunteering opportunities as I did in high school, so I think it would be amazing to both help people and give back while still forming new relationships and gaining technical knowledge and experience.",
    timeCommitment:
      'Classes (ECE220, ECE110, PHYS213/214, gen ed), orchestra (~4 hours/week), EFC EOH/Service (~3 hours/week)',
    techExperience: 'See resume',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'tank sinatra',
    email: 'example@abc.com',
    graduationDate: 'Spring 2020',
    status: 'Rejected',
    major: 'Computer Science+Astronomy',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Software Developer'],
    githubContributions: '44',
    year: 'Freshman',
    classesTaken: '',
    roleReason:
      "I'm a senior in CS + Linguistics with some hard classes and a few internships under my belt, but I'm honestly pretty inexperienced when it comes to projects. Luckily, I spent the past six months as an intern and got used to being the most clueless person in the room and having to pick up new frameworks/technology stacks quickly. In addition, I'm a genuinely justice-oriented person. I'm involved in a lot of activism and cultural organizations around campus, and it's exciting to see a premiere RSO that combines what I study with what I love.",
    joinReason:
      'I have always been interested in the overlap of technology and humanitarian work. Computer science is a powerful tool that can be utilized to help others and I would like to be a part of this. I was an active volunteer for multiple organizations in high school and I would like to continue making positive change in college. I am passionate about both technology and making a positive difference in the lives of others, and there is no reason those should be mutually exclusive. Hack4Impact is a great way to opportunity to pursue my goal, and also allows me to interact with other experienced individuals to learn more about computer science. ',
    timeCommitment: 'Classes: CS 126, CS 173, Math 241, PHYS 212,  Clubs: ACM (ADSA Projects)  ',
    techExperience:
      'AP Computer Science (High School), Internship with DigiSight Technologies, Virtual Reality Education Project, NBA Player Comparison Tool, Liddup Music App,  https://github.com/gauravsharma1999',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Sir caviar',
    email: 'example@abc.com',
    graduationDate: 'Fall 2020',
    status: 'Pending',
    major: 'Computer Engineering',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: 'N/A',
    year: 'Senior',
    classesTaken: '',
    roleReason: "I've taken many CS courses and I have intern experience. ",
    joinReason:
      "Because I felt like as college students, we should not take the opportunity of going to college and learning cool stuff for granted. Only because of the whole society that we could be here. It's quite important that we apply what we learned to help the society to be better, to help others, especially those who are supplying good free services to the public and may inspire future engineers, and to give something back to keep the environment. Hack4Impact is the organization that we as students could also make the world a little bit better. My personal goal is to gain real-world experience of applying coding to the real world application, to learn more about issues that exist today and to be inspired by people who are passionate about what they are doing.",
    timeCommitment:
      "I'm taking cs173, cs225, ece210, and math286. And I have work around 7 hours per week.",
    techExperience:
      'ece110, ece120, ece220, cs173( in progress), cs225(in progress) for the class projects, I made a wall- avoiding sound alarming car for the final project of ece110 with my partner, and an actual easy version of vending machine in ece120. ',
    howTheyKnowUs: 'Facebook',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'von trapp',
    email: 'example@abc.com',
    graduationDate: 'Spring 2020',
    status: 'Rejected',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: '4',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      'I have a strong background in Java, C++, and Python. In the summer of 2017, I conducted research as a part of the Human Brain Project at the Technical University of Denmark with a focus on machine learning implemented in a control system. My project featured a closed loop feedback controller that utilized a cerebellar microcircuit to aid in the machine learning of two robotic joint modules. I have also helped develop an application for the Chinese digital forensics and cybersecurity company Meiya Pico. This application was written in Python that parsed through the HTML of ous websites for specific keywords. Using this information, the websites were sorted based on relevance and relayed back to the user. I have experience working on a team, as demonstrated during my time as an intern for Meiya Pico and during my time conducting research in Denmark. I also have experience with agile application development, machine learning algorithms, data structures, and lower level programming languages such as assembly which I hope to apply towards Hack4Impact.',
    joinReason:
      'Helping the community Collaborating in a team environment Working on a software application',
    timeCommitment:
      "I'm not interviewing this semester and I'm not in any other clubs. I'm taking CS 423, CS 436, and CS 425 this semester.",
    techExperience:
      'I have a lot of experience with iOS programming and a little experience with Flask and Python web programming. I can do UI/UX design on a napkin, and I know CAD.',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'gilly joel',
    email: 'example@abc.com',
    graduationDate: 'Spring 2021',
    status: 'Pending',
    major: 'Computer Engineering',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Product Manager'],
    githubContributions: '160',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      'I am always trying to improve my programming abilities so being a software developer would give me the required skills to write impactful programs that help our community. ',
    joinReason:
      'I want to join Hack4Impact because its mission to empower activists and humanitarians to create lasting and impactful social change really resonates with me and I want to be a part of the journey. I also hope to learn from the more experienced members of the organisation and gain practical knowledge.',
    timeCommitment: 'Illinois Robotics in Space (3-4 hours per week)',
    techExperience:
      'Illinois Robotics In Space: My team and I have been working on implementing a path planning neural network that uses a evolutionary method where neural nets initialized with random wights and biases breed and mutate to give a optimum set of values.Once fully trained, I expect it to have a faster run time than traditional algorithms such as A*.This will allow it to run on smaller and cheaper machines. Our goal is to build a autonomous robot capable of mining mars for icy regolith that could provide oxygen, water and fuel for future off- world colonists. Connect Four AI: Developed a Connect 4 AI that uses the recursive Minimax algorithm and can beat a human. ',
    howTheyKnowUs: 'Facebook',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'squidnade oconnor',
    email: 'example@abc.com',
    graduationDate: 'Fall 2021',
    status: 'Rejected',
    major: 'Statistics & Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: 'N/A',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      'Proficient in Java programming with particular emphasis on object-oriented design. Further information about skillset can be found on my resume.',
    joinReason: 'Included in answer to previous question',
    timeCommitment:
      "Classes: CS233, Math 241, Stat 400, Phil 104 Orgs: 1) ADSA 2) Illinois Sports Business Conference(I'm currently Director of Campus Communication, but the conference ends in February so I won't have much to do after that.I am also probably leaving ISBC at end of year to focus on learning more in CS - related organizations) ",
    techExperience:
      'Classes: CS125, 173, 196, 225, 233 (current) Interned at OptumRx(UnitedHealth Group) last summer for software development and I ended up conducting statistical analysis using RStudio and Python(I even devised and conducted my own experiment; I was able to give my manager a lot of insight as to specific performance deficiencies within particular tasks) .',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Shellen Degenerous',
    email: 'example@abc.com',
    graduationDate: 'Spring 2021',
    status: 'Rejected',
    major: 'Computer Engineering',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '60',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      "I am applying for the role of software developer because I am fascinated by the concept of bringing ideas into fruition. Personally, I am excited to be a part of the creative process behind a new product as well as the implementation of it. I believe that I am a dedicated person and am determined to achieve a specific goal alongside an enthusiastic team. If there are any skills of mine that aren't up to par, I am committed to improving them.",
    joinReason:
      "I really enjoy programming and would love to be able to do something useful with it. I find it hard to get motivation for individual projects and the few I do aren't long-term (hackathons), so I'd love to do something important that will me learn new technologies from it.",
    timeCommitment:
      'CS 374, CS 440, ECE 313, ECE 210. Imagination Dance Team. IEEE Technical Events Director.',
    techExperience: 'Most of this should be included in my resume.',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: 'Can I please be in a group with Helena Chi :D'
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Harley finn',
    email: 'example@abc.com',
    graduationDate: 'Fall 2022',
    status: 'Pending',
    major: 'Computer Science and Statistics',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '60',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      "I love interacting with people. Nothing satisfies me more than understanding people individually. My time with Army ROTC has only reinforced this commitment to positive relation with my team members. I would gladly put others before myself to ensure their wellbeing and happiness, a quality which I believe is essential in a community director. Furthermore, my previous experience aligns well with the responsibilities expected of a community director. I served as the Vice President of my high school's class club - a sort of fundraising and class unity organization. I was tasked with delegating our representatives and through this strengthened my ability to work with ous people of different backgrounds and personalities to unite them under common goals. This experience will allow me to treat each team member of Hack4Impact with the respect and care they deserve, and cater to their needs. My time as an executive board member of the Indian Student Association also helps tremendously.I coordinated a ety of community events and activities to spread cultural awareness.One such event required months of planning and preparation and culminated in a performance involving people from all around campus.Having tackled the challenges of large event logistics, organization, and execution in the past, I have a strong foundation to plan for Hack4Impact.",
    joinReason:
      "Joining Hack4Impact would allow me to apply my skills in ways it's beneficial to the community. By being involved in an organization, I can grow more as an individual by learning more about the ous different communities that are facing ous challenges. Overall, I'm excited about what I can achieve and learn as a member of Hack4Impact. ",
    timeCommitment:
      "Currently I'm taking 16 credit hours all which are technical courses. I will also be looking for internships this semester. However, I'll be able to effectively dedicate my time towards Hack4Impact throughout the semester. ",
    techExperience:
      "I've taken CS courses up to Systems Programming, Data Structures, Software Design Studio, Statistical Computing and currently Numerical Analysis. Beside this, I have done an undergraduate research last semester on java code obfuscation. I've applied my self taught knowledge of Flask and SQL by building a reddit like website ground up which also uses Google OAuth 2.0 authentication by ing users securely sign in with Google+. Currently I'm beginning to learn about React which I hope to apply to future projects.",
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Bubble fett',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Rejected',
    major: 'Computer Science & Linguistics',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '211',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      'I have some experience on the software side however I am by far a beginner and would like to grow in that respect. I thought the best way to learn is through experience, so I thought working as a Software Developer would help. In high school (last year) I represented my District in San Jose as the youth commissioner, I lead a team of High Schoolers to comp several projects including a literacy enrichment program for the under-privileged and a Fair to grow awareness about Mental Health in our community. In this respect I feel as Community Director I would be able to make a sizable impact. ',
    joinReason:
      'The mission of Hack4Impact is one that’s very unique and one that I share entirely, because more than just programming, I’m passionate about doing work that actually has meaning. I care about making a difference, and the knowledge that something I’ve helped develop had an impact on those that the non-profit clients serve would be one of the most gratifying experiences I could ever have as a software developer.',
    timeCommitment:
      'HackIllinois:  ~2 hour time commitment per week until the actual event (Feb 23rd - 25th)',
    techExperience:
      'Past: AP Computer Science, CS 125 (currently a CA lab section leader), CS 196 (worked on the graphical front-end components of a web-based strategy game Current: CS 126, CS 173, Learning Android mobile dev in my free- time',
    howTheyKnowUs: 'Info Session',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Alan Fang',
    email: 'example@abc.com',
    graduationDate: 'Spring 2022',
    status: 'Pending',
    major: 'Computer Science and Statistics',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: '33',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      'I see myself as a maker. It allows me to express my creativity and making skills to create solutions that can solve problems faced by people. Developing Software is my passion and it is ecstatic to see a software project come to life. I fit this role very well as i have been building software project for last 3 years.I am a quick learner and have the right problem solving skills to be able to contribute to this cause.',
    joinReason:
      'I want to join Hack4Impact because none of my projects in the past have catered to solving a problem that will have a huge impact on the lives of other people. I am passionate about pursuing this by being a part of Hack4Impact. I hope to gain a lot of teamwork experience and working with skilled software developers to improve my skillset in software development. ',
    timeCommitment:
      'Current Classes: CS 173, CS 126, STAT 400, MATH 415, HIST 120 (16 Hours Total) Leadership Positions: NOBE(Technology Chair), SASE(Affiliate Committee Representative)',
    techExperience:
      'Technical Classes Taken: CS 125, CS 196 Internships: Benison Technologies, IITGuide(Partial code available on GitHub) Other Projects: SchoolHub, gAIme(Available on GitHub) Personal Portfolio: https://ashankv.github.io/personal_website/',
    howTheyKnowUs: 'Info Session',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Leanardo defishy',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Rejected',
    major: 'Computer Science ',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Software Developer'],
    githubContributions: 'N/A',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      'As a Software Developer I have experience in not only web but also data visualization. My web experience includes creating a chatbot for WeChat using Node.js, making a chrome extension using AJAX, creating and designing websites for both CS 196 and a company I worked for over the summer. I taught a Java workshop to high school teenagers at an event at UIUC called chic tech. Not only do I have the experience needed for a software developer, I also have a lot of leadership under my belt.Over the fall I facilitated and lead a Web hackerspace for CS 196 where I taught topics such as web architecture, web application structure, HTML, CSS, React and design concepts.During high school I taught Science to fourth and fifth graders whose public schools do not teach science because they do not have the funding to do so.Also, I currently mentor and used to lead the programming committee of an FRC robotics team. Lastly, for the role of UI/ UX Designer, I have a lot of experience in design and therefore think I can help hack4impact with the design process.I currently design posters, clothing and flyers for ACM and CS 196. I have also designed and prototyped a mobile application for my summer job as well as an application called StudyBuddy.Furthermore, I have also been able to create and design logos for Webmonkeys, Spect AR and more. ',
    joinReason:
      'I have always been interested in putting the skills that I’m learning in class to use, especially in project-based activities, since I first arrived on campus. What I quickly realized when I went around during Quad day and even now in the engineering buildings was that there seemed to be a disconnect between people making projects and actually using them. In Hackathons and other engineering-oriented RSOs. To me, it seemed like they were making projects purely for the purpose of making a project. I want to join Hack4Impact because I want to know that the work I’m putting in and the skills I have are all going to something bigger than just me. This is the motivation that led me to becoming the president of Liberty in North Korea today—all the money that we fundraise goes to helping North Korean refugees. As a software developer in Hack4Impact, I would not only be learning a lot about many different divisions of computer science, but also about what I personally want to do in computer science.  ',
    timeCommitment:
      'Classes: CS241, CS357, CS418, STAT400  Clubs: Liberty in North Korea, President ',
    techExperience:
      'Courses taken: CS126, CS225, CS233, CS241 (current) Projects: Android apps in CS126 ',
    howTheyKnowUs: 'Facebook',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Filly nelson',
    email: 'example@abc.com',
    graduationDate: 'Spring 2023',
    status: 'Rejected',
    major: 'undecided (considering IT)',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Software Developer'],
    githubContributions: 'N/A',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      "1)Software developer - I'm a cs major so obviously coding is what I'm passionate about. However, unlike most programmers, I prefer working in groups. I very much a people person and I feel working in groups is how you learn to not only make a working product but make it as efficient as can be! 2)Community Director - In high school I would plan fundraisers for my cheerleading team such as a cheer clinic for elementary school students and coordinate coding bootcamps for middle school kids.Since I started college I have helped organized 2 booths for EOH for SWE team tech and Engineering Council.I love meeting new people and this role would give me the opportunity to intreact with as many people as possible across the entire club.",
    joinReason:
      'I want to join Hack4Impact because 1) I think it is a precious opportunity to work with a group of people outside of the business major. I do not know much about technology but I can bring different ideas to the table and at the same time I hope to learn more about it from others. 2) How much I want to learn from the team is how much I want to give back to it. I’ve learned some leadership skills in the past semester, I hope to practice these skills and to use them to make the team a better place for all members. And since Hack4Impact is a relatively new organization, it will be easier to develop a culture among the community.  ',
    timeCommitment:
      'I am taking PHIL 110, AGED 260, ART 105, TE 498, MATH 124, CMN 101.  I am a Leadership Certificate Program Peer Mentor(2hrs / wk), a Membership Associate of Ascend(4hrs / wk), and a Member of Provost’s Undergraduate Advisory Board(1h / month). ',
    techExperience: "CMN 496 - class project on 'The World Happiness Report'",
    howTheyKnowUs: 'Facebook',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Nat Kingfish cod',
    email: 'example@abc.com',
    graduationDate: 'Fall 2021',
    status: 'Accepted',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Tech Lead'],
    githubContributions: '336',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      "Even though it's not much, I've already learned a bit about programming, and I'd love to learn more about software development, especially in a context where I can practically apply what I've learned (and will learn) to help others.",
    joinReason:
      'The reason why I want to join hack for impact is because I want to be able to confidently say that I have used the skills and knowledge I have gained to better my community. I also want to expand on my knowledge of coding and I think that this club will help me learn more and meet new people.',
    timeCommitment: '196 Course Staff, cs 241, cs 357, cs 440, mus 130, not interviewing',
    techExperience:
      'Classes: design thinking, client-side programming, the art of web programming - CS 498, CS 233, CS 225, CS 126',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Guppie Goldberg',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Rejected',
    major: 'Computer Science & Anthropology',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Software Developer'],
    githubContributions: '7',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      "I've been a CA for CS 125 and CS 225 in the past, I was a consultant for IBC last semester. I have good communication skills and a strong sense of design. I understand the essentials of a project and can plan accordingly so the most important components of an application get built first. My most recent product design experience was at Apple. My roommates and I competed in the iContest, an internal ideas competition internal. We conceived, designed, and built a prototype over a period of about two months in our spare time. The idea was really good and we placed as finalists, which meant we were allowed to pitch our idea to a panel of Apple VPs. It was obsessive dedication that made our project stand out. Our meticulous UI design was so good and our UX was so intuitive that the judges asked us if we worked with the Apple HCI team, even though we actually didn't. Even after the competition, about a week later (right when the internship was ending), we got an email from the co-founder of Siri expressing interest in pursuing our idea further. This was really an awesome experience and I'm looking for the same things at hack4impact.",
    joinReason:
      "I am very passionate about the non-profit world and I would love to contribute as much as I can to it. As an CS + Anthropology major, I'm always learning about how different societies are and how technology is a huge part of those differences. I believe that we have so much power to make an impact with the education we receive, and I want to be able to make the most of it. I hope to gain valuable technical skills specifically in data visualization and machine learning along with exposure to non profits and working with those clients. ",
    timeCommitment:
      'TEDxUIUC team member International Consulting Network(ICON) Consultant Currently taking CS 233 and CS 410',
    techExperience:
      'Interned at Facebook as an iOS Engineer and designed + developed a mobile app Taken CS 225, CS 173, CS 126 and CS 125',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Anne of sea gables',
    email: 'example@abc.com',
    graduationDate: 'Fall 2019',
    status: 'Pending',
    major: 'Computer Engineering',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Product Manager'],
    githubContributions: 'N/A',
    year: 'Junior',
    classesTaken: '',
    roleReason:
      "I would be good for all the roles because I'm not good at anything and therefore I would be a questionable fit",
    joinReason:
      "Ultimately, I desire to make a positive impact on the world. The way that Hack4Impact approaches this mission by empowering non-profit organizations resonates strongly with me. Hack4Impact allows for anyone with an idea in mind to see it through to reality, resulting in endless possibilities for good. Contributing to Hack4Impact's mission in any way possible would be incredibly fulfilling.  I also believe that Hack4Impact provides significant opportunity for personal development and growth.Leadership skills aren't simply learned, but rather developed through practice. Hack4Impact is a unique organization that will inevitably generate unique challenges in the future. Working through these challenges as a team will provide invaluable experience, if not life-long friends who share common interests and passions.",
    timeCommitment: 'PHYS 211 ECE 110 ECE 120 PHIL 206 CHEM 103 Army ROTC ',
    techExperience:
      '- a high school object oriented programming class (Java) - poster and flyer design for a few clubs(Canva and Photoshop)- t shirt design for pep rally(Photoshop)',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Duane "the rockfish" Johnson',
    email: 'example@abc.com',
    graduationDate: 'Spring 2021',
    status: 'Pending',
    major: 'computer science',
    gender: 'Male',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Product Manager'],
    githubContributions: 'N/A',
    year: 'Freshman',
    classesTaken: '',
    roleReason:
      "I'm the partiest of planners and I'm filled with joy and I think everyone should be filled with joy and i have lots of joy both right now and not right now so yeah. Also i came up with board game night you're welcome. I also think you should play assasin (where you tag people until you're the winner just google it) idk enjoy my great ideas. Have you ever thought about making a unity quilt. Or the snipe game on snapchat where when you see someone from hack4impact you snipe them to the hack4impact group snap usually catching them doing sonething awkward like eating or frowning except actually never frowning because i will make everyone happy.",
    joinReason:
      'When going into my internship last year I realized there were a lot of technologies several major companies utilize that are not directly taught in school. This club will introduce a ety of apis/libraries that would be useful in hackathons or other projects in the future. Unlike other clubs where the projects feel arbitrary Hack4Impact will actually make a difference which I feel is the most appealing aspect of the club. ',
    timeCommitment: 'cs 225, cs233, physics 211, and a gen ed',
    techExperience:
      '1) CS125(java), CS126(android), CS225(C++), CS233(mips/verilog) 2) General Electric Cyber Security Intern(used chef to harden the onboardidng of cassandra and postgres) 3) UIUC Libraries(Android App that utilized Google’s Firebase Real Time Database app to allow students to give real time updates about libraries on campus) 4) Study Sesh(android app that utilized the noise / brightness level of the room to determine if the room is an ideal study area) 5) GE at Grace Hopper Website(used polymer and predix platform apps to create a website to get girls interested in going to Grace Hopper)',
    howTheyKnowUs: 'Facebook',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Piranha anderson',
    email: 'example@abc.com',
    graduationDate: 'Spring 2022',
    status: 'Pending',
    major: 'Computer Science & Linguistics',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: 'N/A',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      "I have been programming for more than a year now, and I have grown to love it! As a software developer, I've worked with organizations like YouMatter, to build 3-D and 2-D platformer video games on Unity for underrepresented minorities. I'm also interning this semester at John Deere at Research Park, working on technology to help the farming industry. I think I'm a good fit for this position because ultimately, I want to use software for a good cause, and to help people, and this will take me a step further in doing so!",
    joinReason:
      "I want to join Hack4Impact because I want to use technology to help society. I want to build software that will bring people close together and make people's lives easier. I've always wanted to work with NGOs and I love the cause behind Hack4Impact. I hope to gain a fulfilling experience of software development & making an impact on this world while also meeting new, smart people who want to make an impact as well!",
    timeCommitment:
      "I'm doing a part time internship at research park, but I'm only taking one intensive technical class, so I should be pretty available during weekends and weekday evenings. ",
    techExperience:
      'CS 125, CS 126, CS 173, CS 225, WCS tech team projects, and an android application for mental health--confess, a platform for people suffering from mental health disorders can anonymously post questions and get answers, to ultimately build a support group(in progress).',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'berzerker',
    email: 'example@abc.com',
    graduationDate: 'Spring 2023',
    status: 'Pending',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Product Manager'],
    githubContributions: '7',
    year: 'Sophomore',
    classesTaken: '',
    roleReason:
      "Software development requires patience and attention to detail, both of which I pride myself on. I will work tirelessly until I find a solution; however, I understand the value in seeking the advice of my peers and mentors. Throughout my professional experience and education I've learned 'how to learn'--my ous advanced mechanics electives, coupled with computer science classes makes me have to constantly reorient how I approach and solve problems. While I may  lack the experience of other juniors/seniors in CS, I am taking the measures to close the gap and further elevate my understanding of computer science.",
    joinReason:
      'I have been coding for the lesser part of 4 years and have yet to program anything that benefits my community. I have always wanted to find a way to give back to the community and past teaching others how to program, I have never really known any other way until I discovered Hack4Impact. I would like to meet new people who also want to help their community during Hack4Impact. ',
    timeCommitment: 'CS440, CS461, CS412, LING301, FAA110',
    techExperience:
      'Classes: CS225, CS233, CS241 CS126 Internships: NCSA(scraped and analyzed sentiment of earnings reports to see whether they were correlated with the stock market, analyzed aerial images to better understand crop patterns and predict yields.)',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Jennifer Wu',
    email: 'example@abc.com',
    graduationDate: 'Spring 2022',
    status: 'Pending',
    major: 'Computer Science',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['UI/UX Designer', 'Software Developer'],
    githubContributions: '24',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      'I am looking for a platform where I can contribute my knowledge and skills I have acquired so far and create something meaningful from it. I have taken CS125, 126, and 225 where I picked up a lot of coding experience with personal projects and MPs. ',
    joinReason:
      "Apart from what I've already know, I also want to be exposed to more software developing tools and take advantage of the mentorship offered with this organization. I believe this is a great opportunity to work with others who share similar interests and motives while contributing to a greater cause. ",
    timeCommitment:
      'Classes: CS357, CS225 (grade replacement), STAT400, ART102 (studio), ENG199(seminar) Orgs: FLI(Floor Lovers Illinois), Imagination Job: Student Consultant Engineering IT(Siebel Helpdesk)',
    techExperience:
      'CS125, CS126, CS173, CS225, CS233 CS126: android studio PhotoShare app(simple Instagram inspired app) check github link for personal website and on- going project for personal blog',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: 'Thank you for reviewing my application.'
  })
  await newCandidate.save()

  newCandidate = new Candidate({
    name: 'Tundra',
    email: 'example@abc.com',
    graduationDate: 'Spring 2023',
    status: 'Done Interviewing',
    major: 'Computer Engineering',
    gender: 'Female',
    minor: '',
    resumeID: '',
    github: '',
    linkedIn: '',
    website: '',
    role: ['Tech Lead'],
    githubContributions: 'N/A',
    year: 'Senior',
    classesTaken: '',
    roleReason:
      'My interests and career goals lie in software engineering and I would love to get as much experience as possible in it. I have done a software engineering internship beforehand and also have taken many CS courses.',
    joinReason: 'I want to',
    timeCommitment: 'ECE 385, HKN board, recruitment',
    techExperience:
      'CS 225, 374, 431, ECE 391, internship at Target (built a front-end web app using JS & node)',
    howTheyKnowUs: 'Friend/Word of mouth',
    additionalComments: ''
  })

  await newCandidate.save()
}
//   newCandidate = new Candidate({
//     name: 'May B.Dunn',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2020',
//     status: 'Pending',
//     major: 'Computer Science',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead'],
//     githubContributions: '727',
//     year: 'Junior',
//     classesTaken: '',
//     roleReason:
//       'I developed a mobile app called OddJobs with two other partners this past summer interning at Facebook. We went through the entire process from brainstorming and wire-framing to finally developing the app. This app allows for users to post and comp tasks for people nearby and earn money. We had very important deadlines that we had to set for ourselves and report back to our manager. This taught me how to manage time in order to comp the project with highest quality. Many of the features also had to be coded in a certain order so teamwork was especially crucial to developing this app. Since we mostly worked virtually, we updated each other consistently and met our deadlines in order to avoid merge conflicts in GitHub to ensure the success of this project. I believe I can apply these skills to Hack4Impact as a Software Developer. ',
//     joinReason:
//       'After having experience with internships, I realized my desire to learn and create. Despite initially having no prior knowledge on the technologies that I had to use, I wanted to be able to keep up and contribute in developing novel solutions that will be utilized rather than dismissed because an intern created it. Thus, I strive to create impactful solutions with observable impact with others that share my eagerness and desire. Furthermore, Hack4Impact will allow me to work with others with more experience and knowledge, facilitating collaboration and learning from my peers while refining and building upon my existing skillset.  I hope to be able to apply and expand knowledge constantly with the project and the team. I also want to be able to acquire new skills by learning about the technology stack utilized in the project that I’ll be involved in, which I hope to then employ in my future endeavors. Lastly, the organization will allow me to network with non-profit companies and learn about the community through their efforts to solve prevalent issues or those that are overlooked.',
//     timeCommitment:
//       'Introduction to Anthropology (ANTH 101) Electricity and Magnetism(PHYS 212) Applied Linear Algebra(MATH 415) Discrete Structures(CS 173) Software Design Studio(CS 126)ACM SIGAI',
//     techExperience:
// github: '',
//     howTheyKnowUs: 'Friend/Word of mouth',
//     additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Doris Shutt',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2021',
//     status: 'Rejected',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer,Tech Lead',
//       githubContributions: 'N/A',
//       year: 'Senior',
//       classesTaken: '',
//       roleReason:
//       'I want to be a part of Hack4Impact because the idea of using my skills that I have acquired in the last 3 years to contribute to a project that will have a meaningful impact on the world really excites me. I am passionate about software development and love to work on projects. I have also gained experiences in collaborating and working with a team at Illinois Robotics in Space(IRIS) where I hold a leadership position as the Machine Learning Lead.While working on a project at Hack4Impact, I will contribute to make the environment as friendly and fun as humanely possible as well as motivate others to engineer a quality product. ',
//       joinReason:
//       "Although I believe Hack4Impact can significantly enhance my technical coding experience, I also like that Hack4Impact deals with nonprofits. I've done a lot of service in my life, most notably at Hesed House, the local homeless shelter from my hometown. I like that I can enhance my skills both academically and spiritually with Hack4Impact.",
//       timeCommitment:
//       'Courses: ECE 110, ECE 200, MATH 241, PHYS 212, LAST 170 Interviewing: EntreCORPS, OTCR, Phi Chi Theta',
//       techExperience:
//       'ECE 120 - Intro to Computing CS 196 - Freshman Honors - Wrote an algorithm that compares price vs time correlations among different stocks ECE 220 - Computer Systems and Programming(currently enrolled) LPL Financial IT Work - Basic Scripting / Data Migration- Managed / Installed Servers',
//       howTheyKnowUs: 'Friend/Word of mouth',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: '	Ivana Tinkle',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2020',
//     status: 'Rejected',
//     major: 'Computer Science',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer,Software Developer'],
//       githubContributions: '49',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       "I'm applying for the Software Developer role for two reasons: one, because I'm interested in getting more practical / project-based experience in addition to my classroom experience; two, because I'd like to work on projects (both now and in my professional career) that have a tangible impact upon society.  I'd be a good fit because I am not only genuinely motivated to work and learn as much as I can, but I am also very interested in the concept of using technology for social impact.   Although I do not have experience in building or designing web applications, I've learned a lot about computer science in the last 1-1.5 years; I had to work extremely hard and earn high grades in all of my CS classes to be able to transfer into the Stats & CS major, including 101% in CS225. I am very motivated to learn, and learn quickly!",
//       joinReason:
//       'The reason I want to join Hack4Impact, is directly linked to my purpose here at UIUC. I want to learn the tools necessary to help improve the world, and computer science and software is a powerful way to do just that. I would, in the future like to work for or start my own tech-based non profit company. As a freshman, I believe this organization will be a great opportunity for me to not only develop my own skills through building real life applications, but also to make a positive impact on society, which is what i want to dedicate my career to.',
//       timeCommitment:
//       'I am currently a CA and Lab Assistant for CS 125. This is a 5 hour/week commitment.',
//       techExperience:
//       'CS 125 CS 196 AP CS CMSC 122(Web Development at University of Maryland) personal website built from scratch: rishumusic.com CS 125 class project, snakes and ladders: https://github.com/rbagga/SnakesLadders',
//       howTheyKnowUs: 'Info Session',
//       additionalComments: 'Very excited to join this club, if accepted!'
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Marius Quick',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2020',
//     status: 'Pending',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer,Tech Lead',
//       githubContributions: '3',
//       year: 'Junior',
//       classesTaken: '',
//       roleReason:
//       'Software Developer - As a student studying computer science, I have a solid foundation of basic object oriented programming through Java, through classes such as AP CS and CS 125. These skills are further being reinforced currently as I am currently a CA for CS 125. I also have some experience with front-end development as I have taken classes in web development, learning how to effectively use CSS and JS with HTML. Additionally, I have dabbled in Android Development in my free time, as well as in class in CS 196. ',
//       joinReason:
//       '2. I want to join Hack4Impact because I desire to join an organization that is focused on building web applications in a real life setting. Being able to join a community of students working towards useful projects for nonprofits really appeals to me. I hope to become a more experienced software developer while working on a team towards a full project. I feel that being around like-minded students will allow me to become a better developer and help me in the future.',
//       timeCommitment: 'ECE 385, ECE 313, INFO 490',
//       techExperience:
//       'ECE 120, ECE 220, CS 225, CS 173, World Adventures, To-do list, https://github.com/vsrivatsan53',
//       howTheyKnowUs: 'Facebook',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Suryaa Murali',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2020',
//     status: 'Accepted',
//     major: 'Undeclared (working towards coursework in Cognitive/Information Science)',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager',
//       githubContributions: '10',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       'In regards to software development, I believe that my experiences qualify and make me suitable for the position. By working for startup businesses developing web and blockchain solutions, I have gained skills in web development and design using technologies including HTML, CSS, Bootstrap, and Wordpress to develop websites as well as practiced software design principles through creating applications and smart contracts. Outside of internships, my side projects, such as data analysis with lunar phases and crime rates, demonstrate an eagerness to learn, exploring Python and data science without prior knowledge while attempting to continue to apply the skills that were obtained from internships. These opportunities have also allowed me to enjoy and thrive in collaborative environments, working with multiple developers in an attempt to create innovative solutions. It also allowed me to hone my listening and communication skills through discussing and revising ous designs presented by the other developers. However, I ultimately realized through my experiences that the part that I enjoyed the most was witnessing the product that I contributed to grow. My experiences are also applicable for UI / UX.The projects that I contributed to utilized technologies directly related to UI/ UX including HTML, CSS, and Bootstrap.In addition, I acquired more knowledge in UI / UX principles while learning about the quirks of web development languages. Overall, my past experiences have provided me with basic relevant knowledge in order to meaningfully contribute to ous projects while making me realize my passion for developing useful products.',
//       joinReason:
//       "Hack4Impact had a event at Airbnb over last summer, and I was signed up to but things came up and I couldn't go. Since then I’ve had a fascination with what the organization does, and where it’s actually headed. It seems there’s a lot of potential here for people like me to learn a lot about how software projects in the real life world may operate. I’m dedicated to climate action and at the same time technology and design, so this club offers me a good mix of all the areas I’m dedicated to. I think it will be a worthwhile time for me to meet new friends, hone design skills, and hack4impact! ",
//       timeCommitment:
//       '14 credit hours. Siebel Center for Design Intern.  Interviewing with Design For America.  ',
//       techExperience:
//       'Classes: IS 351 Design Info Interfaces, Intro to Graphic Design, and Typography. Currently in TE 333 Creativity, Innovation, and Vision Side Projects: Mostly mobile.On portfolio. Portfolio: https://suryaamurali.voog.com/design  ',
//       howTheyKnowUs: 'Hack4Impact event @ Airbnb ',
//       additionalComments: 'Hope to hear back soon! This org is cool ! :D'
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Gilda Lily',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2023',
//     status: 'Pending',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead',
//       githubContributions: '21',
//       year: 'Sophomore',
//       classesTaken: '',
//       roleReason:
//       'I want to be a software developer for Hack4Impact because I want to apply the web programming knowledge I learned onto a large-scale project that has a positive impact on others! I have taken a web course on the MEAN web stack but I haven’t actually built non-static websites, so I’m excited that Hack4Impact is an organization where I can do so and learn from much more experienced developers. Because Hack4Impact is such a great cause, I am motivated to learn new web technologies quickly, be productive with software development in a team setting, and design useful software with the client in mind. Also, I am a hard worker who never  my teammates down by not doing my part of work, so I am definitely a teammate that Hack4Impact can rely on!',
//       joinReason:
//       'I want to join Hack4Impact to create useful and impactful programs and I hope to gain experience and new skills.',
//       timeCommitment: 'CS 173, CS 225, ECE 391, Interviewing for jobs',
//       techExperience:
// website: '',
//       howTheyKnowUs: 'Timothy Ko',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Mand Lynne',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2022',
//     status: 'Accepted',
//     major: 'Computer Science',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Software Developer'],
//       githubContributions: '61',
//       year: 'Sophomore',
//       classesTaken: '',
//       roleReason:
//       "I'm apply for the Product Manager role. Last summer I was a Product/Project Manager Intern at Echo Global Logistics and I feel that I have developed many of the skills need for this role. Over the summer I managed a team of developer, organized our project, spoke to business clients about features of the project, and held several presentations to upper management at the end of the summer detailing our findings.",
//       joinReason:
//       "I've always wanted to make something for the betterment of society. I think its something that everyone says they want to do but can't find an outfor that / are too lazy to actually do it. I like what this club stands for. ",
//       timeCommitment: 'classes - 15 hrs. cs 225 ca. Hackillinois staff member. ',
//       techExperience: 'See resume + cs241 + cs440',
//       howTheyKnowUs: 'Facebook',
//       additionalComments: "Seems like a good club in theory, I'm excited to see how it'll play out"
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Felix Li',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2022',
//     status: 'Rejected',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead'],
//       githubContributions: 'N/A',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       'I’m mainly applying to the UI/UX Design role to explore how design can play a role in software driven creation for social impact. Also to hone my design and technology related skills. In terms of why I would be a good fit, I think my previous experience and classes gave me a broad range of perspectives and knowledge of tools to design. Those two aspects of me combined can be the beneficial skills I bring to the rso. More specifically, my perspective is focused yet holistic. My focus is on collective learning, energy flows, and complex systems is something unique and fresh for impact. Those three ideas intrinsically build off each other because the combination of language and culture allowed humanity to control our environment for energy leading to ever increasing complexity. That’s a profound idea. It should be at the heart of design for scale across systems global or local.  In terms of the community director role, I’ve been apart of ous clubs where I’ve helped with the organizing of events! I can also bring my experience from that and interest in culture that I gained from taking a anthropology class! ;)',
//       joinReason:
//       'I want to write code that will have an impact on society, and I hope to gain experience and learn more about nonprofits and the community surrounding it.',
//       timeCommitment: 'ECE 411, chamber music ensemble, church, ECE 385 Course Assistant',
//       techExperience:
//       'ECE 391, ECE 385, CS 374, ViaSat internship, Cast21 Internship, Research at the National University of Singapore',
//       howTheyKnowUs: 'Friend/Word of mouth',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Yul B.Allwright',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2019',
//     status: 'Rejected',
//     major: 'Computer Science and Mathematics',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager'],
//       githubContributions: '133',
//       year: 'Junior',
//       classesTaken: '',
//       roleReason:
//       'Over the summer I worked at the NCSA under professor Brunner and learned a great deal about data science. One of the projects I worked on involved collecting earnings reports from the SEC and applying learning algorithms to the reports and testing whether there was a correlation between the sentiment in the reports and the stock market. The second project I worked on while at the NCSA involved analyzing many pictures of ous crops in Illinois and determining yields and classifying what food was growing at what location. For these projects I used python for most of the analysis portion of the project but while collecting data I gained a fair amount of experience in databases such as mongo and postgres.',
//       joinReason:
//       'I want to join Hack4Impact to create useful and impactful programs and I hope to gain experience and new skills.',
//       timeCommitment:
//       'CS 126, CS 173, Math 241, Rhet 105, CS 125 Course Assistant, Alpha Phi Omega Fraternity',
//       techExperience:
//       'CS 125 Created a website that displays the earthquakes that have happened in the past month on a world map. Working on a side project where I am working with a group of 3 to create a chrome extension which checks if a news article is biased or not.',
//       howTheyKnowUs: 'Facebook',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Poppy Cox',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2022',
//     status: 'Rejected',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer'],
//       githubContributions: 'N/A',
//       year: 'Junior',
//       classesTaken: '',
//       roleReason:
//       'I have many experiences that I feel would make me a good fit for the Software Developer Position. At LPL financial last summer, I did basic scripting work to more easily transfer data on the network. I also installed and managed new servers for them.',
//       joinReason:
//       "I love technology and I love helping people. After coming to college I was able to immerse myself in technology but haven't quite found an organization I fit into that helps others. Hack4Impact seems like an amazing blend of both! It would allow me to learn more about technology, the role of a project manager, and make a real, tangible difference in the world. ",
//       timeCommitment:
//       'I am taking 13 hours this semester (Physics 212, CS 173, Math 415 and PS 241). I am part of ECE Pulse and the SITE Committee on the Engineering Council.',
//       techExperience: 'ECE 120/220, ECE 110/210, CS 173 (in progress)',
//       howTheyKnowUs: 'Facebook',
//       additionalComments:
//       'I understand this application is a few hours late but I would really like to opportunity to connect with you guys and learn more about this amazing organization.'
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Phil Landers',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2021',
//     status: 'Pending',
//     major: 'Mechanical Engineering',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead'],
//       githubContributions: 'N/A',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       "I am applying for the Software Developer role because I am interested in the field and want to further develop my technical skills. I want to pursue a career as a software engineer and I think that being a Software Developer at Hack4Impact will give me the opportunity to test what I already know while gaining valuable experience on what it is like to work on a product that is put in use. I think I would be a good fit because I'm genuinely intersted in social entrepreneurship and have extensive experience in C++, Java, and R. I'm a fast learner who can pick up languages and have been working on Node.js and python. I have work on technical projects before individually and as a team, so I can be self-sufficient but also a team player. ",
//       joinReason:
//       "I want to join Hack4Impact not only for the technical experience I will gain from it, but to further understand how to work as a team and to give back to the community. I was particularly interested with how Hack4Impact is structured, with having software engineers, technical leads, and program managers--it feels like a tech company. I want to see how well students can interact and collaborate in this model. Additionally, the most important facet of this club is that it does work for non-profits. My entire college career I've been consuming: knowledge, tuition money, food, with actually giving very little back to society. I want to begin using my skills to the greater good as soon as possible, and I think that this club is an excellent avenue. ",
//       timeCommitment:
//       'Internship (10 hours a week), recruitment/interviews, CS 241, CS 438 (comm networks)',
//       techExperience:
//       'Research work:  developed offline Python applications to analyze large graphical data sets and implemented GUI Class work: CS 125, CS 225, CS 173, CS 233, CS 241, CS 438',
//       howTheyKnowUs: 'Friend/Word of mouth',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Robyn Banks',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2023',
//     status: 'Pending',
//     major: 'Statistics and Computer Science ',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer'],
//       githubContributions: '45',
//       year: 'Sophomore',
//       classesTaken: '',
//       roleReason:
//       '1. I am applying for the software developer role and I feel that I would be a good fit because I have software development experience through classes and on my own. I am motivated to learn more specifically about the full stack web development process. I also believe that I excel working on teams and I would be able to contribute more throughout the year on a team.',
//       joinReason:
//       'I understand that Hack4Impact works with real clients to deliver impactful products such as the Neighborhood News Bureau and I want to be a part of that process. I enjoy volunteering, I did it a lot in high school and I do it with Alpha Phi Omega at UIUC. Part of the satisfaction from volunteering and service is to give back to the non-profit community, which is what Hack4Impact does and why I am interested. I hope to gain experience on developing and delivering an impactful product with a close knit team while contributing to the non-profit society. ',
//       timeCommitment:
//       'Stat 410 CS 233 Math 415 PHYS 123 REL 109  Membership Committee - Alpha Phi Omega Analyst - Venture Capital Academy Interviewing at Unity ',
//       techExperience:
//       'CS 125, CS 126, CS 225, Developed Android Applications, Amazon Alexa Skills, Jane Street Electronic Trading Challenge top 10 with team of 3, NBA Statistical Visualization in R, currently working on Real Estate Valuation Application.  ',
//       howTheyKnowUs: 'Info Session',
//       additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Wade Moore',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2020',
//     status: 'Interviewing',
//     major: 'Mechanical Engineering',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Software Developer'],
//       githubContributions: '221',
//       year: 'Sophomore',
//       classesTaken: '',
//       roleReason:
//       "I've been recently been working to make the career switch to software development, and I've worked on a couple personal projects to improve my own skills and understanding. This would be a perfect opportunity for me to learn from comply different projects as well as working with a team to develop a product. I would be a good fit because of my personal motivation to enhance my own skills, as well as my previous experiences as a student organization board member.",
//       joinReason:
//       "I'm always looking for more opportunities to learn and improve my development skills. Working with a group of motivated people to foster that growth within myself and others is what I'd like out of it, especially because I have been mostly working and learning on my own with regards to coding.",
//       timeCommitment:
//       "No classes, just graduate research and writing my MS thesis. I'll eventually be interviewing while looking for a full time job.",
//       techExperience:
//       'Facebook CUMTD transit chatbot: https://github.com/alex-wuu/cumtd-chatbot Droprecognition used to measure drop during condensation.Currently used in my graduate research: https://github.com/alex-wuu/detect-drop',
//       howTheyKnowUs: 'Authorized Agent #1',
//       additionalComments: "I haven't taken CS125/ECE220, but I can cook."
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Anita Room	',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2021',
//     status: 'Pending',
//     major: 'Finance',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead'],
//       githubContributions: '71',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       "I am applying for the role of Software Developer because I would like to help build a product that can have a big impact on non-profits. While I do have a small amount of experience with web applications through my internship, it wasn't the primary focus of the project and I don't have experience building a web application from the ground up. However, I have taken quite a few CS classes (listed below), and I am definitely willing to put in the effort into learning. I also have a decent amount of experience writing software in a small groups (2-4 people) from class projects and work. ",
//       joinReason:
//       "I want to build products that can actually impact someone's life, lead teams, get PM experience, and I'd love to be able to do some user-growth analysis for projects that have already been launched/compd.",
//       timeCommitment:
//       'CS 465 User Interface Design, Art 310 Design Thinking, Badm 352 Database Design and Management, Fin 321 Advanced Corporate Finance, Fin 435 Personal Wealth Management, AAA Sports Chair, Founders VP of Finance, recruiting, personal app dev. ',
//       techExperience:
//       'in cs 465 and art 310, worked on two apps (personally worked on design & discovering user needs). ',
//       howTheyKnowUs: 'Friend/Word of mouth',
//       additionalComments: "me PM and I will deliver the best damn product you've ever seen."
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'abcd',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2023',
//     status: 'Pending',
//     major: 'Computer Engineering',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager'],
//       githubContributions: '18',
//       year: 'Junior',
//       classesTaken: '',
//       roleReason:
//       "I'm applying for software development, because I'm interested in gaining knowledge and expanding my skills in computer science. Software developers provide the actual creation of the software, and this creativity and problem solving to create interesting solutions excites me. I would be a good fit because I have a strong foundation in computer science, am determined to put in time to learn and grow, and work well in teams.",
//       joinReason:
//       'Hack4Impact is for a great cause to help NGOs operate with better efficiency and outreach to the segments of people they desire. I truly believe in the cause. As a former Model United Nations enthusiast, I believe the impact of creating apps for NGOs is huge. A lot of NGOs are on tight budgets and so having free app development is a great plus. I hope to gain more programming experience by doing a hands- on project with teammates and learning from tech leads as mentors.I also want to be able to talk about a project that I am very proud of! ',
//       timeCommitment:
//       'Classes: ECE 408, CS 440, ECE 210, MATH 415(17 credit hours) Other organizations: ECE Student Advancement Committee, Illinois Business Consulting(~12 hours / week) I will be interviewing for internships.',
//       techExperience:
//       'Check out About Me tab at website icarusoars.github.io for classes taken and projects done! All projects are listed there.',
//       howTheyKnowUs: 'Facebook',
//       additionalComments: 'My name is pronounced as a-bi-cu-du'
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Ima Hogg',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2020',
//     status: 'Accepted',
//     major: 'Engineering Physics',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Tech Lead'],
//       githubContributions: '101',
//       year: 'Freshman',
//       classesTaken: '',
//       roleReason:
//       'I want to expand my knowledge and be able to learn from others by working collaboratively.',
//       joinReason:
//       "It sounds like fun, and I can hopefully do something that's actually valuable and work on a product that will make the world a better place. Plus friends. I hope to gain a good understanding of what being a software developer is actually like, as well as a holistic view of the entire development process of an app/ piece of software.I also think it'd be cool to learn new languages/improve my efficiency with known ones.",
//       timeCommitment:
//       'Classes: CS440 CS241 CS450 PHIL100 ECON102 DANC112 Dance2XS Training Team Director AAA Fashion Show Nightlife Coord(ayooo) PSA Battle of the Bamboo Performer(until late Feb)',
//       techExperience:
//       'PHYS498 aka Computing in Physics. Very cool class CS225 / CS357 / CS374 Systems Engineering Internship at Northrop Grumman',
//       howTheyKnowUs: 'Friend/Word of mouth',
//       additionalComments: 'Hello friends'
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Joe King',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2020',
//     status: 'Pending',
//     major: 'Computer Science',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager'],
//     githubContributions: 'N/A',
//     year: 'Freshman',
//     classesTaken: '',
//     roleReason: 'Software Developer',
//     joinReason:
//       "I'm hoping to gain experience as far as developing products for actual companies to use. I also hope that this opportunity will better shape me and prepare me as an engineer in the real world. In addition, I'm hoping to collaborate with others in a way that will teach me new perspectives that I've never thought about before. Overall, I am hoping for a productive, yet memorable learning experience.",
//     timeCommitment:
//       'Mondays: Class from 10-11am, work schedule may  but ends at 5pm latest Tuesdays: Class from 11-2pm and 3pm - 6pm, may have dance practice from 8-10pm Wednesdays: Class from 9-11am, work schedule may  but ends at 5pm latest Thursdays: Class from 10am - 2pm and 3pm - 6pm, may have dance practice from 8-10pm Fridays: class from 9-10am, work schedule may  but ends at 5pm latest Saturday and Sunday: may  depending on the week, but generally free',
//     techExperience:
//       'ENG198 IEFX Projects 2- My group created a medicine dispenser prototype CS498 VR- My group developed a VR game about sea turtles to spread awareness about endangered species',
//     howTheyKnowUs: 'Friend/Word of mouth',
//     additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Alan Fang',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2022',
//     status: 'Interviewing',
//     major: 'Computer Science',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer'],
//     githubContributions: '170',
//     year: 'Junior',
//     classesTaken: '',
//     roleReason:
//       "The past 2 semesters I invested a majority of my time into developing strong fundamental CS skills from UIUC's core curriculum. I believe that these semesters have given me a strong background as a programming generalist, and that now is an ideal time to explore specific branches of software engineering. Additionally, I have some experience and industry knowledge in the non-profit industry. Last semester, I consulted for a non-profit, specifically analyzing the viability of bringing a crowdfunding to market and assessing the current website implementation. I believe that this experience in working with a non-profit will help me better assess the needs of organizations that Hack4Impact partners with.",
//     joinReason:
//       "One of my biggest hesitations of majoring in Computer Science was its seemingly vast separation from community outreach and service. To me, CS was a means to financial security, providing the luxury to pursue self-actualization through other, unrelated ventures.  But I've grown to love programming, and it is my hope that I can use computer science to one day benefit the world in some way. With Hack4Impact, I will not only be able to hone my skills as a software developer but also contribute to a community of humanitarians and altruists.  I know that the non- profit industry has lots to benefit from the current tech community.I'd love to help contribute to this paradigm shift, and work with other like- minded individuals to help others help people, one line of code at a time.",
//     timeCommitment:
//       'OTCR Consulting - 2-3 hrs/week Possibly RP Staff - 2 hrs / week Recruiting for fall / spring coops - should only affect months of april and may',
//     techExperience:
//       "I've taken all CS core electives through CS241 (125,126,173,225,233,241), and CS465. I'm currently taking CS374, CS411, and CS357.  I would link you to the non - profit that I worked with, but I signed an NDA and cannot discuss specifics of my project.",
//     howTheyKnowUs: 'Facebook',
//     additionalComments: "I'm a hoe :) sorry alan i had to do it and leave your name here"
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Libby Doe',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2021',
//     status: 'Interviewing',
//     major: 'Computer Science',
//     gender: 'Male',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['UI/UX Designer','Software Developer'],
//     githubContributions: '127',
//     year: 'Junior',
//     classesTaken: '',
//     roleReason:
//       "I'm applying because I'm interested in software development and want to get more experience with it, and this sounds like it'd be pretty fun. I think I'm a good fit because I have strong problem solving skills and like to write code that's organized, not messy, and can be easily read by others. I also have programming experience in software from my previous internship at Northrop Grumman.",
//     joinReason:
//       "I want to join Hack4Impact to grow as a developer, give back to the community at the same time, and join a community where I can learn from and get to know others. So far, I have taken quite a few CS classes, but I don't have a lot of experience building a comp standalone application starting from nothing. I think Hack4Impact would be a great way to apply some concepts learned from class, learn from other peers in the organization, and have a real impact by building an application that will be utilized by a nonprofit.",
//     timeCommitment:
//       "CS 374 - 4hrs CS 440 - 3hrs CS 425 - 4hrs SPED 117(Gen Ed) - 3hrs Pulse - High School Co - Director(commitments for this end basically finished by end of January) Course Assistant for CS 233 I've finished the recruiting process for Summer 2018",
//     techExperience:
//       'CS Classes Taken: 125,126,173,225,233,241,357,498(Virtual Reality) Last summer for my internship I worked on a feature for an Android app that could link with other apps in development to track and simulate HTTP requests / responses for logging, debugging, and testing purposes.The feature I worked on was creating a web interface for the app.Besides writing the code for the web app and designing it, a big part was also to have the web app hosted by the phone using web sockets for 2 - way communication, since all the stored data for the app would be local to the phone.',
//     howTheyKnowUs: 'Friend/Word of mouth',
//     additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Washama Butt',
// email: 'example@abc.com',
//     graduationDate: 'Spring 2021',
//     status: 'Invalid',
//     major: 'Computer Science',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager'],
//     githubContributions: '94',
//     year: 'Senior',
//     classesTaken: '',
//     roleReason:
//       "I've selected the role of Software Developer because I believe that I can use the technical skills I've learned throughout the past 4-5 years and apply it to projects that will make a difference in the real world. Furthermore, I'm keen on working with my peers to develop products that will be deployed for use by the public. I believe that my prior skills in mobile and web development will add to the group effort as a whole.",
//     joinReason:
//       'A lot of software development is too commercialized and profit-driven.  Hack4Impact offers a radical change from this and offers an outto use programming skills for social good. I aspire to be an altruistic person and Hack4Impact offers the opportunity for programmers to use their skills to realize this. ',
//     timeCommitment: '4PM-11PM every day, albeit with flexibility for study sessions for my classes',
//     techExperience: 'All of my projects can be found on Github, although it needs updating',
//     howTheyKnowUs: 'n (who is a really cool guy btw)',
//     additionalComments: ''
//   })
//   await newCandidate.save()

//   newCandidate = new Candidate({
//     name: 'Laho La',
// email: 'example@abc.com',
//     graduationDate: 'Fall 2022',
//     status: 'Interviewing',
//     major: 'Mathematics and Computer Science',
//     gender: 'Female',
//     minor: '',
// resumeID: '',
// github: '',
// linkedIn: '',
// website: '',
//     role: ['Product Manager'],
//     githubContributions: '',
//     year: 'Sophomore',
//     classesTaken: '',
//     roleReason: '',
//     joinReason:
//       'I would like to join Hack4Impact because I really like the idea of creating a software product for the social good. I would like to build software that actually makes an impact and I feel Hack4Impact provides me a great opportunity to do this and benefit non-profit organizations in the process. I really like how I can help be part of the process of developing a product that I know will be utilized to help a social cause. I hope to gain quick-thinking skills and a stronger ability to adapt to new challenges. Through collaborating with my fellow developers, I would like to become more confident in my introduction of new ideas which can further improve the final product. I feel this organization provides me the opportunity to do this in a collaborative environment. ',
//     timeCommitment:
//       'Classes currently: Stat 410, Math 416, Stat 200, Atms 120, Kin 142 Extracurricular currently: Involved in Illini Statistics Club',
//     techExperience:
//       'Judlau Contracting Incorporated - Engineering Intern (SQL) Baller Runners Application(https://github.com/aarnika/BallerRunnersApp) Technical classes: CS 125, 126, 173',
//     howTheyKnowUs: 'Timothy Ko',
//     additionalComments: ''
//   })
//   await newCandidate.save()
// }

populateDB().then(res => {
  mongoose.connection.close()
})

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('ERROR: unhandledRejection, did you run `dotenv` before yarn dev?', error.message)
  process.exit(1)
})
