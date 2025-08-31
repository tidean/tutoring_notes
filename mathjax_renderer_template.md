<script type="text/javascript">
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true
    },
    options: {
      skipHtmlTags: ['script','noscript','style','textarea','pre','code'] // don't render inside code blocks
    },
    chtml: {
      scale: 1.3  // Increase this number to make fonts bigger
    }
  };
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js"></script>

# Math Rendering Test

This file tests inline and block LaTeX equations.

---

## Inline Math

Here is an inline equation: $E = mc^2$.

And another one with fractions: $\frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$.

---

## Block Math

Below is a block equation:

$$
a^2 + b^2 = c^2
$$

Another one with summation:

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

And an integral:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

---

## Mixed Text and Math

In probability theory, the **normal distribution** is defined as:

$$
f(x|\mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}
  e^{ -\frac{(x-\mu)^2}{2\sigma^2} }
$$

where $\mu$ is the mean and $\sigma^2$ is the variance.

$4\frac{1}{3}$ = $\frac{}{3}$

$3\frac{2}{7}$ =

$5\frac{3}{5}$ =

$2\frac{5}{8}$ =

$6\frac{1}{4}$ =
