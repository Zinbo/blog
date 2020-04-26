---
date: 2022-04-26
title: "Spring for Humans"
cover: "https://source.unsplash.com/4RWk9AD8U8w/400x300"
categories: 
    - Java
tags:
    - Spring
    - Java
---

I remember the first week of my first ever development job, my team lead came to me and said "We use Spring and Hibernate here, you'll need to learn them". I looked at him blankly, but thought "Hey, I'm sure if I google this I'll figure it out in no time, I'm a University student, I'm smart right?".  

I tried googling for Spring and came across blog post after blog post - I saw lots of mentions of words like "Dependency Injection" and "Inversion of Control". I also saw reams of XML which made no sense to me.

What I realised was that these people who were writing these blog posts were undeniably smart - but lacked the ability to explain concepts to people who didn't understand even the basics about the concept.

So this is my goal for this blog post: explain Spring to you like a human. I want to answer the questions I had when I first started looking at Spring.

## What is Spring Anyway?
When people say "Spring" (assuming they are talking about software development and not DIY or slinkys) they usually mean the [Spring Framework](https://spring.io/projects/spring-framework). Over the past few years it's possible that people may now refer more to [Spring Boot](https://spring.io/projects/spring-boot) when they say "Spring", but lets start with the basics first.

The Spring framework "provides a comprehensive programming and configuration model for modern Java-based enterprise applications". So what does that mean?  
Basically, the Spring framework allows you to create an application without having to worry about how it's all tied together.   
The Spring framework is comprised of a few different parts:
- Core
- Testing
- Data Access
- Web Framework
- Integration
- Language Support

In this post we'll focus on Core, and specifically dependency management.

## Spring Core

### Dependency Injection
A big part of Spring Core is this idea of dependency injection. Dependency injection is a design pattern which makes a class independent of its dependencies (its variables). 

Lets look at an example:
```java
public class BlogPostService {

    private PostgresDatabaseRepository databaseRepository 
        = new PostgresDatabaseRepository();

    public BlogPost getBlogPostById(String id) {
        return databaseRepository.getBlogPostById(id);
    }
}


public class PostgresDatabaseRepository {

    public PostgresDatabaseRepository() {
        // connect to our database here
    }

    public BlogPost getBlogPostById(String id) {
        // We would go to our database here and
        // get our blog post
        BlogPost blogPost = new BlogPost();
        blogPost.setId(id);
        blogPost.setContent("my blog post content");
        blogPost.setName("Spring for Humans");
        return blogPost;
    }
}


public class BlogPost {
    private String id;
    private String name;
    private String content;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

```
Here we have a class `BlogPostService` which gets and returns a blog post by id from the database, by using `DatabaseService`.  
We have a few problems here:
1. We can't unit test `BlogPostService` independently of `PostgresDatabaseRepository`
2. `BlogPostService` is coupled to `PostgresDatabaseRepository` - what if we wanted to use a `MySQLDatabaseRepository` instead? We would need to change our implementation of `BlogPostService`, which could then break our implementation and our test. You might think this is fine for one class, but what if we have 50 service classes that all need to change to use `MySqlDatabaseRepository`?

In fact, our implementation here breaks the "D" in the SOLID principles, where D stands for Dependency inversion principle. This states that one should "depend upon abstractions, not concretions". This sounds fancy, but all it means is that our `BlogPostService` is completely dependent on the class `PostgresDatabaseRepository`, which makes it a pain if we need to change it.

So what can we do to get around these problems? Dependency Injection to the rescue!
```java
public class BlogPostService {

    private DatabaseRepository databaseRepository;

    // here BlogPostService's dependency is injected in
    public BlogPostService(DatabaseRepository databaseRepository) {

        this.databaseRepository = databaseRepository;
    }

    public BlogPost getBlogPostById(String id) {
        return databaseRepository.getBlogPostById(id);
    }
}


public class PostgresDatabaseRepository implements DatabaseRepository {

    public PostgresDatabaseRepository() {
        // connect to our database here
    }

    public BlogPost getBlogPostById(String id) {
        // We would go to our database here and
        // get our blog post
        BlogPost blogPost = new BlogPost();
        blogPost.setId(id);
        blogPost.setContent("my blog post content");
        blogPost.setName("Spring for Humans");
        return blogPost;
    }
}


public interface DatabaseRepository {

    BlogPost getBlogPostById(String id);
}
```

Now we can easily unit test our `BlogPostService` like so:
```java
    public class BlogPostServiceTest {

    @Test
    public void getBlogPostById_withValidId_returnsBlogPost() {
        // arrange
        BlogPost expected = new BlogPost();
        String id = "123";
        expected.setId(id);
        BlogPostService service = new BlogPostService(
            new MockDatabaseRepository(expected));

        // act
        BlogPost actual = service.getBlogPostById(id);

        // assert
        Assert.assertEquals(expected, actual);
    }

    private class MockDatabaseRepository implements DatabaseRepository {

        private BlogPost expected;

        public MockDatabaseRepository(BlogPost expected) {
            super();
            this.expected = expected;
        }

        public BlogPost getBlogPostById(String id) {
            if(id.equals(expected.getId())) return expected;
            return null;
        }
    }
}
```
Also, if we have a class `MySqlDatabaseRepository` which also implements `DatabaseRepository` then we can pass that class instead to the `BlogService` constructor. Success!

However if `BlogPostService` is no longer responsible for managing it's own dependencies, then who is? Well, we could always manage our dependencies ourselves like so:
```java
public class Main {

    public static void main(String[] args) {
        BlogPostService blogPostService = DependencyContainer.getBlogPostService();
        blogPostService.getBlogPostById("123");
    }
}

public class DependencyContainer {

    public static BlogPostService getBlogPostService() {

        return new BlogPostService(getDatabaseRepository());
    }

    public static DatabaseRepository getDatabaseRepository() {
        return new PostgresDatabaseRepository();
    }
}
```
This works, however it can get unwieldy. Especially if we have many dependencies and you want your dependencies to be Singletons, which most likely you do.

So what can we do?

### Spring to the Rescue

This is where the beauty of Spring comes in. Spring Core contains what is called the "Inversion of Control container" (more on the term "inversion of control" later). This container is represented by the `org.springframework.context.ApplicationContext` interface and ais reponsible for instantiating, configuring and assembling our dependencies. It does this by reading metadata in the form of XML, Java annotations, or Java code. I would strongly recommend **not** using XML - it's outdated and much harder to read and debug.

So lets see how we can do the above with Spring:
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import springforhumans.withspring.SpringConfiguration;

public class Main {

    public static void main(String[] args) {
        // Set up Spring
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(SpringConfiguration.class);
        context.refresh();

        BlogPostService blogPostService = context.getBean(BlogPostService.class);
        BlogPost blogpost = blogPostService.getBlogPostById("123");
        System.out.println(String.format("Blog post id='%s' name='%s' content='%s'", blogpost.getId(), blogpost.getName(), blogpost.getContent()));
    }
}

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springforhumans.BlogPostService;
import springforhumans.DatabaseRepository;
import springforhumans.PostgresDatabaseRepository;

@Configuration
public class SpringConfiguration {

    @Bean
    public BlogPostService blogPostService(DatabaseRepository databaseRepository) {
        return new BlogPostService(databaseRepository);
    }

    @Bean
    public DatabaseRepository databaseRepository() {
        return new PostgresDatabaseRepository();
    }
}


public class BlogPostService {

    private DatabaseRepository databaseRepository;

    public BlogPostService(DatabaseRepository databaseRepository) {

        this.databaseRepository = databaseRepository;
    }

    public BlogPost getBlogPostById(String id) {
        return databaseRepository.getBlogPostById(id);
    }
}

/** All other classes have same implementation **/
```
Lets unpack whats going on here:
- We create a configuration class called `SpringConfiguration` which has the annotation `@Configuration`. This tells Spring that it is a dependency configuration class. 
- The `SpringConfiguration` sets up our beans - don't be worried about this term, bean just means a [standard java object](https://www.oracle.com/technetwork/java/javase/documentation/spec-136004.html).
- Spring automatically knows which `DatabaseRepository` implementation to pass into the `blogPostService()` method - Spring intelligently figures out the dependency wiring order.
- we can get our beans by doing `context.getBean(MyClass.class)`
- Spring creates each of these beans as singletons by default, meaning that each time you call `context.getBean(MyClass.class)` you'll get the same object of that class.

Hmmm, this doesn't look much less work than our implementation above. Let's look at another way of doing this with Spring:

```java
package springforhumans;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {
        // Set up Spring
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext("springforhumans");

        BlogPostService blogPostService = context.getBean(BlogPostService.class);
        BlogPost blogpost = blogPostService.getBlogPostById("123");
        System.out.println(String.format("Blog post id='%s' name='%s' content='%s'", blogpost.getId(), blogpost.getName(), blogpost.getContent()));
    }
}

@Component
public class BlogPostService {

    private DatabaseRepository databaseRepository;

    public BlogPostService(DatabaseRepository databaseRepository) {

        this.databaseRepository = databaseRepository;
    }

    public BlogPost getBlogPostById(String id) {
        return databaseRepository.getBlogPostById(id);
    }
}

@Component
public class PostgresDatabaseRepository implements DatabaseRepository {

    public PostgresDatabaseRepository() {
        // connect to our database here
    }

    public BlogPost getBlogPostById(String id) {
        // We would go to our database here and
        // get our blog post
        BlogPost blogPost = new BlogPost();
        blogPost.setId(id);
        blogPost.setContent("my blog post content");
        blogPost.setName("Spring for Humans");
        return blogPost;
    }
}
```
This looks better! Let's again unpack what's happening here:
- We got rid of the `SpringConfiguration` class.
- We instead specified our base package to the `AnnotationConfigApplicationContext` constructor. This scans for any class which contains the `@Component` annotation.
- We added `@Component` to our classes.

Now in this example it doesn't look like we've saved ourselves much effort by using Spring - however the benefit is more obvious when we have more dependencies to manage - trying to manage our own dependencies can quickly amount to a mess. 

It is important to note the price that comes with using `@Component`. Our classes now have a dependency on Spring, as they import the `@Component` annotation, which they did not have to do when we were using the `SpringConfiguration` class. Realistically you're not likely to switch to a different dependency Injection container in the same project, but it's important to be aware of nonetheless.

It is also important to note that using base package scanning with `@Component` and using `SpringConfiguration` are not mutually exclusive. We can use both in the same project and I regularly do. `SpringConfiguration` is great if your bean requires more complex set up, which often happens when setting up Database connectors.

### When should I not use dependency injection?
I'm sure you'll agree that dependency injection looks great - let's use it everywhere!
Don't do that. Like everything dependency injection has its place. Most often dependency injection is suitable for classes which are:
- stateless
- will be instantiated as a singleton (but they don't have to be, see [here](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes) for details.)
- Will be reused.
- services, database connectors, infrastructure connectors (e.g. REST Controllers).

A bad candidate for dependency injection is our `BlogPost` class - objects of `BlogPost` will contain unique state for each blog post and will not be singletons. It would not make sense to try to inject `BlogPost`s into other classes.

### Dependency Injection Vs Inversion of Control
You might have heard of terms "dependency Injection" (DI) and "inversion of Control" (IoC) floating around. Often people say that they are the same thing, however I think of them as different concepts.

In terms of Spring:
- IoC - the container which inhibits the ability to use dependency injection. For me the ApplicationContext is the IoC Container, which follows the pattern of the framework calling the application, rather than the application calling the framework (so the application is not dependent on a framework).
- DI - The act of a class allowing its dependencies to be injected, rather than having the responsibilty to instantiate it's own dependencies.

## Why would I need Spring?
Hopefully I have already answered this question!

Spring is great for managing dependencies as already discussed. However the Spring framework contains many more features than just dependency injection. Remember the list of Spring Framework features I listed in [What is Spring anyway?](#what-is-spring-anyway). The beauty of Spring is that the more you use its features, the more benefit you get, as unsurprisingly Spring have made sure that the features integrate with each other nicely. 

And it's not just Spring Core. Spring has a multitude of different projects. Some of these include:
- [Spring Boot](https://spring.io/projects/spring-boot): Easily create standalone Spring applications that are wired together automatically. All the magic by adding the `@SpringBootApplication` annotation. Often used to create web applications but can also be used as stand-alone publishers, subscribers, and more.
- [Spring Data](https://spring.io/projects/spring-data): Easily create repository interfaces for your ORM objects, including automatically deriving queries from your method names
- [Spring Cloud](https://spring.io/projects/spring-cloud): Provides tools for building cloud ready applications.

## What are some alternatives to Spring?

Spring is a big topic, but lets list some alternatives to the Spring framework and Spring Boot

Alternatives to Spring Framework (DI):
- [Guice](https://github.com/google/guice)
- [Dagger](https://dagger.dev/)

Alternatives to Spring Boot:
- [Micronaut](https://micronaut.io/)
- [Dropwizard](https://www.dropwizard.io/en/latest/)
- [Quarkus](https://quarkus.io/)

I think the one to look out for is Micronaut - It's getting a lot of traction in the Java community due to its compatibility with [GraalVM](https://www.graalvm.org/) and it lack of use of Reflection.


## What you've learnt
Well done for sticking to the end!

Spring can appear overwhelming and confusing, and indeed it is a big subject. Much bigger than this blog post has room for. However, like with anything, start small and build your knowledge over time. 

I would recommend getting your head around using Spring for dependency injection by trying the examples laid out here in this blog yourself, and then giving Spring Boot a go. Spring's own guide on creating a [RESTful web service](https://spring.io/guides/gs/rest-service/) is a good place to start.

Happy Coding!
