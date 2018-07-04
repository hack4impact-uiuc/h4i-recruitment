# h4i-recruitment [![CircleCI](https://circleci.com/gh/hack4impact-uiuc/h4i-recruitment/tree/master.svg?style=svg&circle-token=:circle-token)](https://circleci.com/gh/hack4impact-uiuc/h4i-recruitment/tree/master)
H4I UIUC recruitment platform (in progress)

This application uses [Next.js](https://github.com/zeit/next.js), an incredible framework built on top of React that allows for server-side rendering, [Express.js](https://expressjs.com/) for the backend API along with MongoDB as the choice of data persistence.

**TODO** move this prosposed spec to `proposal.md` and then include the final spec on this README

# Proposal
This recruitment platform will encompass "faceMash" and an overview of applied applicants, which includes their standing after faceMash has completed and multiple ways of visualizing applicants to speed up the decision process. Interviewers will also be able to write their notes on the interviwee's page and give them qualitative rankings.

## Why
In order to sustain the increasing amount of interest and applicants for Hack4Impact UIUC, we need a better system to efficiently select the right candidates for our next class. The following are main problems that we encountered from last semester's selection process with Google Spreadsheets:
- inability to easily visualize all candidates in different ways such as grouping them by certain attributes such as their "community" score or cumulative score, their year, their rank, etc.
- couldn't always see the candidate's "important" (what we believe was important) information without having to scroll left or right. For example, if you were trying to read candidate A's interviewer notes and you forgot what year candidate A was in, you would have to scroll all the way left to see their graduation year, then scroll back to continue reading the interviewer notes. Not only that, you would often scroll past the interviewer notes by accident too since there was a lot of other information (in that case, clutter). Another example would be when you would want to compare candidate A (indexed at 1) and candidate B (indexed at 49), you would have to scroll up and down to compare each candidate.
- lack of selection procedure without specific ways to score candidates => a lot more opinions based on recent memory => more biases
- many of the interviewer notes were not fully completed out by the interviewer => less information giving when deliberating for the final candidates

## Proposed Features
- List of Candidates: A screen showing a list of candidates showing the "important" information about each candidate. You will also be able to sort candidates by different attributes such as their FaceMash ranking described later. Declined candidates will go to the bottom of the list **or** show up in a different page
- FaceMash: A separate portal for general members to go to, where they will be continuously shown two different candidates with all their information and they will decide who is better. Eventually, with enough entries, candidates will be ranked by our algorithm for the first round eliminations.
- Candidate Pages: Shows all the candidate's application answers and information. Interviewers will be able to submit their interview notes (let's call it an `interviewer submission`). There should only be 2 interviewer submissions that include the interviewer's name, notes, and score they give the candidate.
#### After those core features are done...
- a secret key that would allow you leads to enter interviewer notes + look at candidates
- specific keys for our general members that would link to back to them. this is to keep general members accountable and prevent general members from cheating the system (a general member can give their friend that's applying to the H4I the link to faceMash, who would then consistently vote for himself/herself or a general member can randomly pick candidates without much consideration, causing a weird disparity of rankings). 

## Caveats
- We must keep track of the time tickets of each interviewer submission, faceMash submission, declining submission (when we decline a candidate moving them to the "declined" list)
- We must create the application form on our main website that will call this api
- this is a proposal and requires much flushing out

## Stages of this App
- Before/During FaceMash
- After 1st Round eliminations & during Interviews
- Deliberations

by @tko22
