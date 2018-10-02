---
layout: post
category: Dev
tags: C# EfCore 
---

## Brief Overview of HasData
In Entity Framework before .NET Core, entity framework had a way to create seed data but that method had a number of issues so they decided not to bring it over to Entity Framework Core. Now that we're into version 2.1 of Entity Framework Core, they wanted to allow for a way to seed the data with certain types of data.

The way it works is to override the OnModelCreating method of the DbContext. The OnModelCreating method is for mapping your entities to the database types. E.g.:

{% highlight csharp %}
protected override void OnModelCreating(ModelBuilder bldr)
{
  base.OnModelCreating(bldr);

  bldr.Entity<Person>()
    .Property(p => p.Name)
    .HasMaxLength(100);
}
{% endhighlight %}
In this example, I'm just setting the max length of the name to be 100 characters long (and we could have done this with an attribute too if that's your kind of thing).

But this is where we can use HasData to add seeded data:

{% highlight csharp %}
protected override void OnModelCreating(ModelBuilder bldr)
{
  base.OnModelCreating(bldr);

  bldr.Entity<Person>()
    .Property(p => p.Name)
    .HasMaxLength(100);

  bldr.Entity<Person>()
    .HasData(new Person
    {
      Id = 1,
      Name = "John Sheu",
      Birthdate = DateTime.Parse("1969-04-05")
    },
    new Person
    {
      Id = 2,
      Name = "Akinwale Alexander",
      Birthdate = DateTime.Parse("1975-07-05")
    }
    );
}
{% endhighlight %}
You'll see that I can simply add new people by specifying the primary key and the data I want to seed. This works great.

One drawback to think about is that this is created every time that a context is created, so you wouldn't want to use it for large amounts of data (e.g. if you're reading from a file to seed the database). It's great for things like lookup tables or state/country lists.

## My Problem
So my problem started when I wanted to seed related entities too. So, my Person class looks like this:

{% highlight csharp %}
  public class Person
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Birthdate { get; set; }
    public ICollection<Toy> Toys { get; set; }
  }
{% endhighlight %}

So I thought I might be able to just add the toys here and HasData would fix it:

{% highlight csharp %}
bldr.Entity<Person>()
  .HasData(new Person
  {
    Id = 1,
    Name = "John Sheu",
    Birthdate = DateTime.Parse("1969-04-05"),
    Toys = new List<Toy>()
    {
      new Toy()
      {
        Id = 1,
        Name = "Tonka Truck"
      }
    }
  },
  new Person
  {
    Id = 2,
    Name = "Akinwale Alexander",
    Birthdate = DateTime.Parse("1975-07-05")
  }
);
{% endhighlight %}

Nope! Related entities aren't that easy. The error message was clear, I needed to add these on the Toy entity. My Toy entity looks like this

{% highlight csharp %}
public class Toy
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public Person Owner { set; get; }
}
{% endhighlight %}

So I thought that I'd create it via the Entity<Toy>:

{% highlight csharp %}
bldr.Entity<Toy>()
  .HasData(new Toy()
  {
    Id = 1,
    Name = "Tonka Truck",
    Owner = person1 // Nope!
  }
);
{% endhighlight %}

Even if I was saving the person1 to specify the owner, this doesn't work.

## One Way to Solve It
Initially this implied that I needed to change my entity to expose the PersonId as a property:

{% highlight csharp %}
bldr.Entity<Toy>()
  .HasData(new Toy()
  {
    Id = 1,
    Name = "Tonka Truck",
    OwnerId = 1 // Works but yuck
  }
);
{% endhighlight %}

There has to be a more elegant way.

## A Better Solution
You can use anonymous types and that's where the magic happens. Even if I don't have a PersonId, the HasData can infer it from the model that is needed under the covers to make sense of it. For example, here is my Toy entity again:

{% highlight csharp %}
public class Toy
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public Person Owner { set; get; }
  // NO OwnerID necessary
}
{% endhighlight %}

And if I change my HasData to use an anonymous type, it just works:

{% highlight csharp %}
bldr.Entity<Toy>()
  // Anonymous Type, not Toy Type
  .HasData(new 
  {
    Id = 1,
    Name = "Tonka Truck",
    OwnerId = 1 // Works but yuck
  }
  );
{% endhighlight %}

In fact, I might argue that anonymous types for all HasData has benefits of simplicity where the shape of the seeded data is more important than the type:

{% highlight csharp %}
bldr.Entity<Person>()
  .HasData(new
  {
    Id = 1,
    Name = "John Sheu",
    Birthdate = DateTime.Parse("1969-04-05")
  },
  new
  {
    Id = 2,
    Name = "Akinwale Alexander",
    Birthdate = DateTime.Parse("1975-07-05")
  }
  );

bldr.Entity<Toy>()
  // Anonymous Type, not Toy Type
  .HasData(new 
  {
    Id = 1,
    Name = "Tonka Truck",
    OwnerId = 1 // Just Works Now
  }
  );
{% endhighlight %}
You can see this is the ultimate migration from this seeding:

{% highlight csharp %}
migrationBuilder.InsertData(
    table: "People",
    columns: new[] { "Id", "Birthdate", "Name" },
    values: new object[] { 
      1, 
      new DateTime(1969, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 
      "John Sheu" });

migrationBuilder.InsertData(
    table: "People",
    columns: new[] { "Id", "Birthdate", "Name" },
    values: new object[] { 
      2, 
      new DateTime(1975, 7, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 
      "Akinwale Alexander" });

migrationBuilder.InsertData(
    table: "Toy",
    columns: new[] { "Id", "Description", "Name", "OwnerId" },
    values: new object[] { 1, null, "Tonka Truck", 1 });

{% endhighlight %}