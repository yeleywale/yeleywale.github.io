---
layout: post
category: Dev
tags: [Scala, Functional Programming] 
---
A good grasp of typeclasses is the gateway to understanding popular FP libraries in the Scala ecosystem. Typeclasses are widely leverage in many functional libraries such as ZIO, Cats, Scalaz, etc., for the following use cases:

1. Implementing functional ....
2. For ....


Typeclasses is an abstract language construct that falls off our hands as result of a disciplined use of traits -- for creating them, implicits -- for ensuring they manifest on the use site in a succinct way. 



A lot of times when writing Scala codes, I had inadvertently used a typeclass. The most common usage profile in the Scala language is when I want to sort a List based on an ordering predicate.

I can sort a list of Int in ascending order:
> List(3,5,2,9,6,1).sortWith(_ > _ ) 

And in descending order:
> List(3,5,2,9,6,1).sortWith(_ < _ ) 

I can also do same with strings
> List("Do", "Re", "Me", "Fa")

> List(List(2,46,35,3), List(2,1,3)).sortWith(_>_)

I can not use Ordering trait for types that are non primitive. To make it work with non primitive types, I have to extends the Ordering trait and implement it's methods.

Well, as simple as it looks on the outside to implement sorting using an ordering mechanism, it took the implementers 
```scala
   trait Concatenate[A] {
       def concatenate(a: A, b: A): A
   }
```

```scala
   final case class TwoString(a: String, b: String)

   object ConcatStrings extends Concatenate[String] {
       def concatenate(a: String, b: String): String = a + b
   }

   val p1 = TwoString("Alex", "Akin")
   ConcatStrings.concatenate(p1.a, p1.b)
   //res0: String = AlexAkin
```


> Type Classes go above and beyond that, allowing us to abstract over type constructors and not just ordinary first order types like types(String).

As the name suggest, where a class in the OOP sense is a template for a taxonomy of objects that could be implemented in that class, a Typeclass is a class that defines a couple of behavior for a category of Types. For a type F, a typeclass defines methods that can be invoked on it. 

In Scala Typeclasses are used to abstract over a type constructor while the type constructor ends up being used in a method of the type class.

 Typeclasses let our codes evolve independently of any type, and they are resolved at compile time allowing us to fix errors if there are any.