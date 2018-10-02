---
layout: post
category: Dev
tags: React.js,Web
---

## What is React.js

Facebook describes ReactJs as a UI library for creating high performant web and native application. 

Let me add this:

> React is a UI rendering and eventing library for creating UIs from the bottom-up by composing parts in a declarative and functional way.



## Virtual DOM
Unlike other libraries that interact directly with the DOM, React got a little bit smarter by abstracting away the DOM, thereby giving it the power to perform whatever magic with the application state before it gets translated to DOM elements. 

Pure sorcery you would say! The virtual DOM is just a fancy name for a Javascript object representing your real object. It's at the center of react's philosophy and architecture, without it there may not be a better way to write performant client-side web apps. 

If you are familiar with robust system design, you would appreciate what good abstractions do afford you, and even more so when you have a complex system like the Document Object Model where updation, insertion, deletion and the rest are expensive. 

A good analogy to this is the object relational mapper(ORM) which provides a way for developers to code in their domain and have it converted automatically to database models without having to understand much about SQL, or database query language. React maps changes between the model &mdash; this time a representation of the U.I state &mdash; and the DOM model.

## Functional and Declarative

That's not just about it, people forget that Reactjs leans more to the functional paradigm, so every model represent an immutable state of the UI. When changes happen, they trigger a re-rendering which effectively represents a spanking new state. Therefore, it's possible to undo and redo state seamlessly, and that's just a side benefit, what's more important is that we have substituted side-effects for effects. The former making codes difficult to reason about, and the latter given us a succinct and composable code.

In a ReactJs application, state and props represent the model of the user interface. It's interesting to note that they get passed into the function or component when components get called, thereby giving us that declarative paradigm that gives react its power. that defines their inputs as properties and outputs as callbacks. They can be freely nested within each other.

React Components are self-contained unit of functionality that publish a single interface

## Approaching React.js
For updates, reactJs relies on its own event-handling mechanism to help trigger and handle updates. But one thing is very important is to begin with a react application with no component to render is what we should consider. I like starting from a no operation to some operation. That way we would understand how everything gets wired.

So what about updates? Web apps of today are not the cookie cutter web pages we had, they are sophisticated and compares favourably to the best native applications. Needless to say that reactjs also has a native counterpart that is gaining traction steadily

create-react-app has become the defacto of bootstrapping a react application, unless you want to deal with the clunky aspect of transpiling JSX, doing Hot Module Replacement, Configuring a web Server with Webpack or browserify, and ensuring many plugins are compatible. Since these tools aren't orthogonal to understanding react, create-react-app came as a welcome improvement.

However, if you haven't created react applications without create-react-app, by using Webpack or Browserify, and Babel for transpiling JSX and ES versions, and connecting Webpack to a server to perform Hot Module Replacement, it would be worth your time to get acquainted with those. Before `create-react-app`, tooling around a full-fledged React application required some mastery, now `create-react-app` has lowered the barrier significantly.