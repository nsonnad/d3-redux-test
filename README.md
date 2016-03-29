#### d3 + redux

This is a little test of a redux store updating d3 rendering,
particularly around the behavior of dispatching redux from direct interaction of
d3-rendered DOM elements. Currently you can click and drag the circles, as well
as resize them using a slider. These actions simply update the redux store then
re-render everything a-la react, using d3's update selections to handle the
re-render.

    npm install
    npm start
