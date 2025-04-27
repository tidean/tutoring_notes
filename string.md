# String: Part 2

## String Slicing

Similar to string indexing, but now we are grabbing multiple items from the string.

In the code snippets below, >>> means the result after running the code

### For example

```python
s1 = "supernatural"

# Grabbing the first 5 characters
s1[:5]
>>> "super"

# Grabbing everything AFTER the first 5 characters
s1[5:]
>>> "natural"
```

Slicing uses the same logic as indexing.

### More complex examples

```python
s2 = "The dog barks!"

# Including index position to make it easier
# character -> index #

#   T -> 0
#   h -> 1
#   e -> 2
#     -> 3
#   d -> 4
#   o -> 5
#   g -> 6
#     -> 7
#   b -> 8
#   a -> 9
#   r -> 10
#   k -> 11
#   s -> 12
#   ! -> 13

# Grabbing characters FROM the 4th index up to but not including the 7th index
s2[4:7]
>>> "dog"

# Grabbing characters FROM the 8th index up to but not including the 13th index
s2[8:13]
>>> "barks"

# Grabbing characters FROM the 0th index up to but not including the 7th index
s2 [0:7]
>>> "The dog"

# Notice that this is the same as we did before, we can omit the 0 at the beginning
s2[:7]
```

### Your turn now

```python
s3 = "The boy runs!"
s3[:3]
>>>

s3[4:13]
>>>

# which code should you run to get an output of
>>> "!"
s3[  :  ]
```

## String Concatenation

This glues strings together

### Examples

```python
"Hello " + "World"
>>> "Hello World"

"I am learning" + " python!"
>>> "I am learning python"

a = "I like"
b = " "
c = "playing"
d = "games!"

a + b + c + b + d
>>> "I like playing games!"
```
