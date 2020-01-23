---
title: "Let Business Write Business Logic"
description: "Using Erlangs built-in lexing and parsing libraries we can easily define restricted and safe grammars that will let your business team define simple rules in your system. Essentially offloading arbirtrary business logic to the business team themselves."
date: "2019-05-31T19:13:35.239Z"
categories:
  - Web Development
  - Software Development
  - Grammars
  - Elixir
  - Erlang
  - yecc
  - leex
published: true
---
# Overview
---
**You can watch instead of read.**

_This was a talk at [The Big Elixir 2019](https://www.thebigelixir.com/) in New Orleans_

<iframe width="560" height="315" src="https://www.youtube.com/embed/GTP0llRvEmE?start=52" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Today we’re talking about Lexers and Parsers, more importantly I want to show you how you:

1. Can give your business team a crazy amount of flexibility
2. With out compromising your systems.
3. Or spending a lot of effort.

After reading this you should know how to:

1.  Tokenize a string with [leex](http://erlang.org/doc/man/leex.html) (an Erlang lexer library)
2.  Turn those tokens into an Abstract Syntax Tree with [yecc](http://erlang.org/doc/man/yecc.html) (an Erlang parser generating library)
3.  Apply logic to that AST with [Elixir](https://elixir-lang.org/).

**Essentially how to build a boolean based templating language! (in very few lines of code)**

# The Problem.

Lets imagine a hypothetical project:

> A application that is responsible for sending surveys to customers of veterinary clinics.

and the PM just created this story:

> As an administrator I would like to be able to determine who gets a survey based on the location of the user, their pets age and the clinic they are a customer of.

Now right awaythese is a lot of quick sand here.

![](https://media1.tenor.com/images/190200bf9d6c171e75daab926b40c710/tenor.gif?itemid=5139670)

Many requirements and parameters; that could change often; using a lot of dev time.

For example in the near future we may want to send surveys based on a user or clinic feature flag, a pets species or breed and potentially some other model entirely. Leaving us a lot to edit, repeatedly.

# The Solution.
_Give your entire company commit access!_

_Just kidding!_

This is a story of who will be responsible for the changes and how. Think of it as a spectrum ranging from 100% dev to 100% admin responsibility. Some solutions on that spectrum:

1.  Teach administrators to code and let them create pull requests
2.  Create an admin panel with an element per field and let admins use it
3.  Devs hard code these rules at the requests of administrators

As with most spectrums, the ends are extreme, the same goes for options 1 and 3. 1 results in a severely unstable and vulnerable system, 3 would lead to a slow process and product cycle.

**Option 2 is the obvious and sane path, but that doesn’t exempt it from drawbacks.**

It will introduce a lifelong set of overhead into the system: The overhead of everytime we add/remove a new field we have to be conscious of adding/removing the views, routes and controllers that is related to the administration of that field in relation to these surveys. _On a large team this may be trivial but for a small team this could take up a significant amount of total dev time._

The question is: if dev time is a constraint is there another solution between 1 and 2. Thankfully largely due to Elixirs interop with Erlang there is. With the help of [yecc](http://erlang.org/doc/man/yecc.html) and [leex](http://erlang.org/doc/man/leex.html): Erlangs built in lexing and parsing libraries we can easily create a boolean language to help business safely define the rules on the system.

Don't believe me? Here let me show you.

## What are we going to create

For demo purposes we are going to stick to a simple template language that will include:

-   `TRUE` and `FALSE` values
-   `AND` operator
-   `NOT` operator
-   Variables

The priniciples from these will allow us to extend the solution to use:

1.  Numerical values
2.  Logical operators (`<` , `>`, `≤`, `≥`, `=`)

However with brevity in mind I will cover that in a subsequent post :)

# Setup

Make sure you have [Elixir](https://elixir-lang.org/) installed then run:

```bash
mix new lexer_parser
cd lexer_parser
mix deps.get
mkdir src
touch src/business_lexer.xrl
touch src/business_parser.yrl
```

Next we want to create 2 additional files that will contain our code.

```bash
mkdir src
touch src/business_lexer.xrl
touch src/business_parser.yrl
```

These are the only files we are adding over the course of this whole demo! Simple right?

## Start simple

Lets first focus on getting something working. What we want to build is a function that takes a `string` containing the keywords `true`, `false` and `and` then returns the resulting `boolean` value.

For example:

```elixir
LexerParser.evaluate('true and false')
{:ok, false}

LexerParser.evaluate('true and true')
{:ok, true}

LexerParser.evaluate('false')
{:ok, false}
```

## How this system works (Explained 4 different ways)

> Lexer → Parser → Elixir interface

While this might seem new and intimidating I assure you its not.

Our system is easily broken into 3 steps

1.  Tokenize: Identify substrings of significance
2.  Parse: Identify the sequence of these tokens
3.  Compute: Determine the result of the sequence

Another way to conceptualize it is the different shapes data will take through our system.

> **String → Array → Abstract Syntax Tree → Boolean**

And finally in really pragmatic form:

> **Lexer (.xrl) → Parser (.yrl) → Apply Logic(.ex)**

Lets kick this off with the Lexer.

# Lexer (leex)

**Definition**

`.xrl` files are used by `[leex](http://erlang.org/doc/man/leex.html)` which is a lexer analyzer generator for Erlang. **Again it sounds complicated, it’s not**. Lexers apply rules to a string that will identify tokens and turn them into a format we can use.

*It’s how we know that `true`, `false` and `and` are important while whitespace and other noise can be ignored.*

Here lets dive into the code first, then we can pick it apart.

## The Code

Add the following to `src/business_lexer.xrl`

```erlang
Definitions.
WS    = ([\\000-\\s]|%.*)

Rules.
false   : {token, {false,   TokenLine}}.
true    : {token, {true,    TokenLine}}.

and     : {token, {and_op,  TokenLine, list_to_atom(TokenChars)}}.

{WS}+   : skip_token.
```

### What does this do

**Definitions:** These are the patterns of characters we are looking for. This is how we go from list of characters to a token.

**Rules:** `<pattern> : <result>.` This defines what we do with a token after we've identified it. *This is where we first apply meaning.*

**TokenLine:** The line number where the token occurred. (provided by [leex](http://erlang.org/doc/man/leex.html))

**TokenChars:** The list of the characters in the matched token. (provided by [leex](http://erlang.org/doc/man/leex.html))

**list\_to\_atom:** Changes a list of characters to an atom, this is to be able to match on the :and atom later. (provided by erlang)

**skip\_token:** Discard the token; Don’t apply any meaning to it.

## Run the code

Let’s see what happens if we run some simple strings through the Lexer. You can do so anywhere in your elixir project via the `:business_lexer.string/1` function. Lets do that! Start by opening your terminal and running `iex -S mix` . Next enter the following:

```elixir
iex(1)> :business_lexer.string('true')
{:ok, [true: 1], 1}

iex(2)> :business_lexer.string('false')
{:ok, [false: 1], 1}

iex(3)> :business_lexer.string('true and false')
{:ok, [{true, 1}, {:and_op, 1, :and}, {false, 1}], 1}

iex(4)> :business_lexer.string('and')
{:ok, [{:and_op, 1, :and}], 1}

iex(5)> :business_lexer.string('doesnt exist')
{:error, {1, :business_lexer, {:illegal, 'd'}}, 1}
```

Notice that it should return `:ok` for tokens the lexer recognizes and `:error` for the tokens it does not.

**This is what we will pipe into the Parser.**

# Parser (yecc)

**Definition**

`.yrl` files are used by `[yecc](http://erlang.org/doc/man/yecc.html)` which is a parser generator for Erlang. If Lexers were about determining which sequence of characters are important, Parsers are about determining what to do with them. **Parsers give meaning to the order of these tokens.**

_1. Its how we determine that the tokens on the left and right of `and` are needed._

_2. Its also how we determine `true` and `false` don't need any other information to be parsed._

**The Code**

Add the following to `src/business_parser.yrl`

```erlang
Nonterminals expression bool.

Terminals and_op true false.

Rootsymbol expression.

expression -> bool : '$1'.
expression -> expression and_op expression  : {binary_expr, and_op, '$1', '$3'}.

bool -> true : true.
bool -> false : false.
```

### What am I looking at

**Terminals:** These are what we built in the [leex](http://erlang.org/doc/man/leex.html) file. These are tokens we’ve found and thus are not worth further breaking up. Note here that `expression` and `bool` are keywords defined by **us** below. These Terminals can only appear on the RHS of the rules.

**Nonterminals:** These are essentially more complex structures that we define with multiple rules below. Essentially patterns of terminals. These can appear on either the right hand side or the left hand side.

**Rootsymbol:** The starting point for the whole AST. This tells our grammar where to start and should be define in at least one rule.

**Grammar Rules:** These are the lines in the format `<nonterminal> -> <pattern of terminals and non terminals> : <result>` . They define how we interpret patterns and the code we return. It's key to note that the result will be what we interpret in the elixir code. For example `expression -> expression and_op expression : {binary_expr, and_op, '$1', '$3'}.` when given `true and true` will return `{:binary_expr, :and_op, true, false}`

**Binary expression:** The `binary_expr` is an atom will will match on to denote that the operator (in this case `:and_op`) will have two operands (children).

## Run the code

Alright lets run this, like the lexer this parser will be available anywhere in your project by calling `:business_parser.parse/1` the thing to know is that the input for this function is the tokens from the output of `:business_lexer.string/1` . Lets open our `iex` terminal again and you can see what exactly that looks like:

```elixir
iex(1)> 'true'
  |> :business_lexer.string()
  |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()

{:ok, true}

iex(2)> 'false'
  |> :business_lexer.string()
  |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()

{:ok, false}

iex(3)> 'true and false'
  |> :business_lexer.string()
  |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()

{:ok, {:binary_expr, :and_op, true, false}}

iex(4)> 'true and true and true'
  |> :business_lexer.string()
  |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()

{:ok, {:binary_expr, :and_op, true, {:binary_expr, :and_op, true, true}}}

iex(5)> 'and'
  |> :business_lexer.string()
  |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()

{:error, {1, :business_parser, ['syntax error before: ', ['\\'and\\'']]}}

iex(6)> 'doesnt exist' |> :business_lexer.string() |> fn {:ok, tokens, _} -> :business_parser.parse(tokens) end.()
** (FunctionClauseError) no function clause matching in :erl_eval."-inside-an-interpreted-fun-"/1

    The following arguments were given to :erl_eval."-inside-an-interpreted-fun-"/1:

        # 1
        {:error, {1, :business_lexer, {:illegal, 'd'}}, 1}
```

And there we go! We are going from a string all the way to an AST. **We are now lexing and parsing with no additional dependencies and very few lines of code.** The final step from here is to interpret the tree. To do that we can use our favorite language…Elixir!

# Applying the logic

We’re going to make use of 3 functions and some pattern matching to wrap this all up. Our goal here is to interpret the output of our parser into either `true` or `false`.

Lets start by modifying our `lexer_parser.ex` file to include a function that summarizes our system:

```elixir
def evaluate(expression) do
    with {:ok, tokens, _} <- :business_lexer.string(expression),
         {:ok, tree} <- :business_parser.parse(tokens) do
      evaluate_tree(tree)
    end
  end
```

Next lets define the function that evaluates the tree, the rules to define are:

1. If it’s a binary expression, evaluate the tree at each operand and afterwards take the results and apply logic to them based on the operator.
2. If it’s true or false go straight to applying logic (hint: the logic will be fairly redundant at this stage)

```elixir
# Tree functions
# =============

def evaluate_tree({:binary_expr, op, a, b}) do
  with {:ok, a} <- evaluate_tree(a),
        {:ok, b} <- evaluate_tree(b) do
    apply_logic({:binary_expr, op, a, b})
  end
end

def evaluate_tree(other) when other in [true, false] do
  apply_logic(other)
end
```

Finally lets apply the logic that will make use of `true` `false` and `and`:

```elixir
# Logic functions
# ==============

def apply_logic(boolean) when boolean in [true, false], do: {:ok, boolean}

def apply_logic({:binary_expr, :and_op, a, b})
  when is_boolean(a) and is_boolean(b), do: {:ok, a and b}
```

## Run the code

Again jump into your `iex` shell and test this all out:

```elixir
iex(1)> LexerParser.evaluate('true')
{:ok, true}

iex(2)> LexerParser.evaluate('false')
{:ok, false}

iex(3)> LexerParser.evaluate('true and false')
{:ok, false}

iex(4)> LexerParser.evaluate('true and true and true')
{:ok, true}

iex(5)> LexerParser.evaluate('and')
{:error, {1, :business_parser, ['syntax error before: ', ['\\'and\\'']]}}

iex(6)> LexerParser.evaluate('doesnt exist')
{:error, {1, :business_lexer, {:illegal, 'd'}}, 1}
```

And Done! We’ve changed the whole game! Alright not really but from here are the foundations to iteratively add a-lot of functionality really easy. Like how about adding variables?

# Variables

Adding the ability to define variables is trivial. The end result should look something like this:

```elixir
iex(1)> LexerParser.evaluate('a and b', %{"a" => true, "b" => true})
{:ok, true}
```

Let’s dive in:

## 1\. Add the appropriate definition and rule to the lexer

We want to add a definition that will encapsulate any variable name (`[A-Za-z_][0-9a-zA-Z_]*`) and a rule that will take that variable name and transform it into an atom and mark it as `var`.

This is what your `business_lexer.xrl` file should look like afterwards:

```erlang
Definitions.

VAR   = ([A-Za-z_][0-9a-zA-Z_]*)
WS    = ([\\000-\\s]|%.*)

Rules.

false   : {token, {false,   TokenLine}}.
true    : {token, {true,    TokenLine}}.

and     : {token, {and_op,  TokenLine, list_to_atom(TokenChars)}}.

{VAR}   : {token, {var,     TokenLine, list_to_binary(TokenChars)}}.
{WS}+   : skip_token.
```

## 2\. Update the parser to include a new Terminal, Rule and a small Erlang function

We essentially want to tell the parser that when given a variable to use it’s key as it’s value.

This is what your `business_parser.yrl` file should look like afterwards:

```erlang
Nonterminals expression bool.

Terminals var and_op true false.

Rootsymbol expression.

expression -> bool : '$1'.
expression -> var : extract('$1').

expression -> expression and_op expression  : {binary_expr, and_op, '$1', '$3'}.

bool -> true : true.
bool -> false : false.

Erlang code.

extract({T,_,V}) -> {T, V}.
```

Note the additions of the `Erlang code.` section. Nothing fancy here just a function that will pull the value out for us.

## 3\. Update our functions to allow for variables and to interpret the var atom.

Simply we want to include one additional rule to the `apply_logic` function that when it encounters `:var` to return the related value from a given map of variables.

This is what your `lexer_parser.ex` file should look like afterwards:

```elixir
def evaluate(expression, variables \\ %{}) do
    with {:ok, tokens, _} <- :business_lexer.string(expression),
         {:ok, tree} <- :business_parser.parse(tokens) do
      evaluate_tree(tree, variables)
    end
  end

  # Tree functions
  # =============

  def evaluate_tree({:binary_expr, op, a, b}, variables) do
    with {:ok, a} <- evaluate_tree(a, variables),
         {:ok, b} <- evaluate_tree(b, variables) do
      apply_logic({:binary_expr, op, a, b}, variables)
    end
  end

  def evaluate_tree(other, variables) do
    apply_logic(other, variables)
  end

  # Logic functions
  # ==============

  def apply_logic(boolean, _variables) when boolean in [true, false], do: {:ok, boolean}

  def apply_logic({:binary_expr, :and_op, a, b}, _variables)
    when is_boolean(a) and is_boolean(b), do: {:ok, a and b}

  def apply_logic({:var, variable}, variables) do
    case Map.get(variables, variable, nil) do
      nil -> {:error, "variable \\"#{variable}\\" not provided in: #{inspect variables}"}
      value -> {:ok, value}
    end
  end
```

## Run the code

```elixir
iex(1)> LexerParser.evaluate('some_system_defined_bool and another_system_defined_bool', %{"some_system_defined_bool" => true, "another_system_defined_bool" => true})
{:ok, true}

iex(2)> LexerParser.evaluate('some_system_defined_bool and another_system_defined_bool', %{"some_system_defined_bool" => true, "another_system_defined_bool" => false})
{:ok, false}
```

# NOT

Another type of rule we can add is an **unary expression**. Essentially an operator that takes one operand. The best demonstration of this is the `not` operator. This would be a rule that inverts a boolean value. For example:

```elixir
iex(1)> LexerParser.evaluate('not false')
{:ok, true}
```

Let me show you how easy this would be to add.

## 1\. Update the lexer

Your getting the hang of this now so I’ll make this more to the point. Add the following rule to `business_lexer.xrl`:

```erlang
not     : {token, {not_op,  TokenLine, list_to_atom(TokenChars)}}.
```

## 2\. Update the parser

First add the `not_op` to your list of terminals:

```erlang
Terminals var and_op not_op true false.
```

Then add a rule, tagging the `not_op` as an unary expression and passing along the value to the right of it:

```erlang
expression -> not_op expression : {unary_expr, not_op, '$2'}.
```

## 3\. Update our logic

Add one extra definition to `evaluate_tree2` that handles a unary expression:

```elixir
def evaluate_tree({:unary_expr, op, a}, variables) do
    with {:ok, a} <- evaluate_tree(a, variables) do
      apply_logic({:unary_expr, op, a}, variables)
    end
  end
```

And add one extra definition to `apply_logic/2` that applies the `!` to any `:not_op` value:

```elixir
def apply_logic({:unary_expr, :not_op, a}, _)
    when is_boolean(a), do: {:ok, !a}
```

## Run the code

```elixir
iex(1)> LexerParser.evaluate('true and not false and a', %{"a" => true})
{:ok, true}
```

# The rest of the f\*\*cking owl
![](https://i.imgur.com/j3J4dfT.png)

Like I said at the start of the post we could keep going on to include numerical values and other operators like `>`, `<`, `=`, &c. But I won’t do that. Instead I’m going to point you towards a open source library that will do it for you and show you a glimpse of the code so that you know just how simple it still is.

## Enter Expreso

[Expreso](https://github.com/ympons/expreso) is a great library maintained by [ympons](https://github.com/ympons) that does all of this heavy lifting for us. It includes:

- `+`, `-`, `/`, `*`
- `in`
- `>`, `<`, `≥`, `≤`, `=`, `≠`
- `and`, `or`, `not`
- floats and integers

Here’s an example of what it can accomplish:

```elixir
iex(1)> Expreso.eval('not email_disabled and pet_age > 4.1 or clinic_id = 123', %{"email_disabled" => false, "pet_age" => 4.2, "clinic_id" => 124})
{:ok, true}
```

and the code isn’t much more complicated that what we’ve wrote above. Here’s what the parser from this library looks like:

```erlang
Nonterminals expression predicate scalar_exp elements element bool.

Terminals atom var number string mult_op add_op and_op or_op in_op not_op eq_op comp_op '(' ')' ',' true false.

Rootsymbol expression.
Left 100 or_op.
Left 200 and_op.
Left 300 eq_op comp_op.
Left 400 in_op.
Left 500 add_op.
Left 600 mult_op.
Nonassoc 700 not_op.

expression -> bool : '$1'.
expression -> predicate : '$1'.
expression -> var : extract('$1').
expression -> expression or_op expression   : {binary_expr, or_op, '$1', '$3'}.
expression -> expression and_op expression  : {binary_expr, and_op, '$1', '$3'}.
expression -> not_op expression : {unary_expr, not_op, '$2'}.
expression -> '(' expression ')' : '$2'.

predicate -> bool eq_op bool : {binary_expr, extract('$2'), '$1', '$3'}.
predicate -> scalar_exp eq_op scalar_exp : {binary_expr, extract('$2'), '$1', '$3'}.
predicate -> scalar_exp comp_op scalar_exp : {binary_expr, extract('$2'), '$1', '$3'}.
predicate -> scalar_exp in_op '(' elements ')' : {binary_expr, in_op, '$1', '$4'}.
predicate -> scalar_exp not_op in_op '(' elements ')' : {binary_expr, not_in_op, '$1', '$5'}.

predicate -> scalar_exp in_op var : {binary_expr, in_op, '$1', extract('$3')}.
predicate -> scalar_exp not_op in_op var : {binary_expr, not_in_op, '$1', extract('$4')}.

scalar_exp -> scalar_exp add_op scalar_exp : {binary_expr, extract('$2'), '$1', '$3'}.
scalar_exp -> scalar_exp mult_op scalar_exp: {binary_expr, extract('$2'), '$1', '$3'}.
scalar_exp -> element : '$1'.

elements -> element : [extract_value('$1')].
elements -> element ',' elements : [extract_value('$1')|'$3'].

element -> atom : '$1'.
element -> var : extract('$1').
element -> string : extract('$1').
element -> number : extract('$1').

bool -> true : true.
bool -> false : false.

Erlang code.

extract_value({_,V}) -> V.
extract({T,_,V}) -> {T, V}.
```
You can see there's not alot of new concepts in here. Just more copy and pasting as new operators are added.

# Wrap this all up
> Give me a lever and a place to stand and I will move the earth.

> \- Archimedes

In the end the challenge to overcome with diving into Erlang and its tooling isn't complexity, it's syntax. If your willing to put in the time to learn the basics the leverage you can apply to building systems is immense.

And if you don't feel you have the time, theres always the community's shoulders to stand on because they've built some pretty great things.