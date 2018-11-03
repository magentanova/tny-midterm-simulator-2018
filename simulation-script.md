# Simulation Script

Since our app renders updates to election counts in real time, Our attempt here is to simulate as closely as possible, at accelerated speed, what is going to happen on Tuesday evening. Here is the algorithm, where R(n - m) indicates a random number between n and m. 

  - Every R(1 - 30) seconds.
    
    - Pick a random race.

    - Increase the number of precincts reporting by R(.02 - .12) * current value (by 2 - 12%)

    - For each candidate in that race

      - Increase their number of votes by R(.02 - .12) * current number of votes

    - If the portion of precincts reporting is now > 85% 

      - Mark the race as "called" for the candidate that currently has the most votes. 