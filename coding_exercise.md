# Coding exercise

As part of the application process, you must complete this coding exercise. You can either:
1. complete the exercise, upload it to github, and email Wai-Yin the link.
2. complete the exercise, and email Wai-Yin the file.

## Exercise 1

Write a function/method that when given an object/dictionary/hash with a title and url, the function will print a linked title.

* If the title is longer than 50 characters, truncate the title to 50 characters followed by 3 ellipses.
* Use the print/console method from your programming language.

Input:
```js
{
  title: 'really, really, really long title that will be chopped off',
  link: 'example.com'
}
```

Output:
```html
<a href="example.com">really, really, really long title that will be cho…</a>
```

## Exercise 2

Write a function when given an array of objects/dictionaries/hashes, the function will print out a linked title for each object. Call the function from previous question in this function.

Input:
```js
[
  {
    title: 'Github',
    link: 'github.com'
  },
  {
    title: 'Google',
    link: 'google.com'
  },
  {
    title: 'really, really, really long title that will be chopped off',
    link: 'example.com'
  }
]
```

Output:
```html
<a href="github.com">Github</a>
<a href="google.com">Google</a>
<a href="example.com">really, really, really long title 3 that will be ch…</a>
```

