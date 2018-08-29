## What is ReactJs

Folks at Facebook describes ReactJs as a UI library for creating high performant web and native application. 

Let me add this:

```
React is a UI rendering and eventing library for creating UIs from the bottom-up by composing parts in a declaration and functional way.

```

Unlike other libraries that interact directly with the DOM, Reat got a little bit fancier by abstracting away the DOM, thereby giving it the leverage to perform whatever magic with the model before it get translated to DOM elements.

If you are familiar with robust system design, you would appreciate what abstraction do afford you, and even more so when you have a complex system like the Document Object Model where updation, insertion, deletion and the rest are expensive.

A good analogy to this is the object relational mapper(ORM) which provides a way for developers to code in their domain and have it converted automatically to database models withou having to understand much about SQL, or database query language. Reacts maps changes between the model &mdash; this time a representation of the U.I state &mdash; and the DOM model.

That's not just about it, people forget that reactjs leans more to the functional paradigm, so every model represent an immutable state of the UI. When changes happens, they trigger a re-rendering which effectively represents a spanking new state. Therefore, it's possible to undo and redo state seamlessly, and that's just a side benefit, what's more important is that we have substituted side-effects for effects. The former making codes difficult to reason about, and the latter given us a succinct and composable code.

In a ReactJs application, state and props represent the mode of the user interface. It's interesting to note that they get passed into the function or component when components get called, thereby giving us that declarative paradigm that gives react its power.

For updates, reactJs relies on its own event-handling mechanism to help trigger and handle updates. But one thing is very important, to begin with a react application with no component to render is waht we should consider. I like starting from a no operation to some operation. That weay would understand how everything gets wired.

So what about updates? Web apps of today are not the cookie cutter web pages we. had in the days of yore, they are sophisticated and compares favourably to the best native applications. Needless to say that reactjs also has a native counterpart that is gaining traction steadily