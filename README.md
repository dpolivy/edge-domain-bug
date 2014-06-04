** Bug Repro for Domain error handling in edge.js **

As shown in this example, despite having code that is executed from within
a domain, async code executed from the edge.js callback does not trap errors
within the domain as expected.

You can comment/uncomment the 3 test scenarios to see how things behave with
errors thrown at different points in the callstack.

It seems like edge.js needs to do some additional work when domains are present.