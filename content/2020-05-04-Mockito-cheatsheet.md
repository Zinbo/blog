# Mockito Cheat Sheet
Mockito is a great framework for testing in java. I use it all the time and have done for many years now. It works hand in hand with dependnecy injection, a topic I covered in my last blog "Spring for humans". However I find it's a victim of it's own success - there's a lot you can do with it so I often forget how to do things!

So here's a cheat sheet which covers most of the features I use in Mockito.

# Setting Up Mockito
## Using JUnit <5 Annotations
```java
import org.mockito.junit.MockitoJUnitRunner;
import org.junit.runner.RunWith;

@RunWith(MockJUnitRunner.class)
public class MyClassTest {
    ...
}
```

## Using JUnit 5 Annotations
```java
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class MyClassTest {
    ...
}
```

## Using @Before
Useful if you need more than one RunWith/Extend (e.g. `SpringJunit4ClassRunner`)
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;

public class MyClassTest {
    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
    }
    ...
}


```

# Creating Mocks and Spies
An easy way I use to remember the difference between mocks and spies is:
- Mock: By default, all methods are stubbed unless you say otherwise.
- Spy: By default, all methods use real implementation unless you say otherwise.

## Creating a Mock

### Use Annotations on Fields
There seems to be a consensus that this is the cleanest way to mock an object (which goes against my brain's aversion for field injection, but that's a story for another day).
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Mock;

public class MyClassTest {

    @Mock
    private MyClass myObject;

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        // myObject is now a mock
    }
    ...
}
```

### Create from method
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Mock;

public class MyClassTest {

    private MyClass myObject;

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        myObject = Mockito.mock(MyClass.class);
    }
    ...
}
```

### Create from method using Initialised Object
Useful if you want a mock to be created from an object which has been constructed using a constructor.

```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Mock;

public class MyClassTest {
    
    private Person person = Person("name", 18);

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        person = Mockito.mock(person);
    }
    ...
}
```

## Creating a Spy
This is very similar to mocks.

### Use Annotations on Fields
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Spy;

public class MyClassTest {

    @Spy
    private MyClass myObject;

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        // myObject is now a spy
    }
    ...
}
```

### Create from method
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Spy;

public class MyClassTest {

    private MyClass myObject;

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        myObject = Mockito.spy(MyClass.class);
    }
    ...
}
```

### Create from method using Initialised Object
Useful if you want a spy to be created from an object which has been constructed using a constructor.

```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Spy;

public class MyClassTest {
    
    private Person person = Person("name", 18);

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        person = Mockito.spy(person);
    }
    ...
}
```

## Using Deep Stubs
TODO

# Stubbing a method
## Returning from a stubbed Method
```java
import org.mockito.MockitoAnnotations;
import org.junit.Before;
import org.mockito.Spy;

public class MyClassTest {
    
    private Person person = Person("name", 18);

    @Before
    public void before() throw Exception {
        Mockito.initMocks(this);
        person = Mockito.spy(person);
        Mockito.when(person.calculateIfOldEnoughToDrink()).thenReturn(true);
    }

    ...
}
```
TODO: When using when then return on a spy, Mockito will call the real method and then stub your answer - is that true?
- apparently using doAnswer means you can stub it safely.
## Providing alternative implementation for a method
TODO: Look into returnAnswer?

## Stubbing a void method
TODO: look into doAnswer
```java
doAnswer
```

## Calling real method
TODO: callRealMethod

## throwing an exception from a method

# Matchers
 
## Using real param

## Using any

## Using anyClass

## Using eq

## Using custom matcher

# Injecting Mocks


# Verifying a Mock has been called

## Capturing Arguments
