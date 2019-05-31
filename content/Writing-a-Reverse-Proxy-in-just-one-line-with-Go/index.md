---
title: "Writing a Reverse Proxy in just one line with Go"
description: "Leave your programming language hang ups at the door and come admire the best standard library I’ve ever come across. Choosing a Programming Language for a project shouldn’t be like declaring who…"
date: "2018-07-12T03:01:06.714Z"
categories: 
  - Go
  - Google
  - Software Development
  - Reverse Proxy
  - Writing A Reverse Proxy

published: true
canonicalLink: https://hackernoon.com/writing-a-reverse-proxy-in-just-one-line-with-go-c1edfa78c84b
---

Leave your programming language hang ups at the door and come admire the best standard library I’ve ever come across.

![This is all the code you actually require…](./asset-1.png)

Choosing a Programming Language for a project shouldn’t be like declaring who your favourite team is. it should be a matter of pragmatism and choosing the right tool for the right job.

In this post I want to show you when and why Go shines as a language. Specifically I want to show you how rock solid their standard lib is for basic internet programming. Even more specifically… were gonna write a Reverse Proxy!

> “Go has a lot going for it but where it really struts it stuff is in these lower level network plumbing tasks, there’s no better language.”

What is a reverse proxy? **A big fancy way of saying a traffic forwarder.** I get a request send from a client, send that request to another server, receive a response from the server and forward it back to the client. The reverse part of this simply means the proxy itself determines where to send traffic and when

![Just beautiful 😍…](./asset-2.gif)

Why is it useful? Because the concept is so simple it can be applied to assist in many different cases: Load balancing, A/B Testing, Caching, Authentication etc…

By the end of this short post you will have learned how to:

-   Serve HTTP requests
-   Parse the body of a request
-   Serve traffic to another server using a Reverse Proxy

### Our Reverse Proxy Project

Lets dive into the actual project. What we are going to do is have a web server that:

1\. Takes requests

2\. Reads the body of a request, specifically the `proxy_condition` field

3\. If the proxy domain is equal to `A` send traffic to URL 1

4\. If the proxy domain is equal to `B` send traffic to URL 2

5\. If the proxy domain is neither then send traffic to the Default URL.

#### Prerequisites

-   [Go](https://golang.org/) for programming with.
-   [http-server](https://www.npmjs.com/package/http-server) for creating simple servers with.

#### Setting up our environment

First thing we want to do is input all the required configuration variables into our environment so that we can both use them in our application while keeping them out of source code.

I find the best approach is to create a `.env` file that contains the desired environment variables.

Below is what I have for this specific project:

_This is a habit I picked up from the_ [_12 Factor App_](https://12factor.net/config)

After you save your `.env` file you can run:

```
source .env
```

to configure load the config into your environment any time.

#### Laying the foundation of our project

Next lets create a file called `main.go` that does the following:

1\. When started logs the `PORT`, `A_CONDITION_URL`, `B_CONDITION_URL`, and `DEFAULT_CONDITION_URL` environment variables to the console

2\. Listen for requests on the path: `/`

💀Let’s get the skeletons out of the closet so we can move onto the fun stuff.

Now you should be able to run

#### Parse the request body

Now that we have the skeleton of our project together we want to start creating the logic that will handle parsing the request body. Start by updating `handleRequestAndRedirect` to parse the `proxy_condition` value from the request body.

Basic parsing of a JSON blob to a struct in Go.

#### Use `proxy_condition` to determine where we send traffic

Now that we have the value of the `proxy_condition` from the request we will use it to decide where we direct our reverse proxy to. Remember from earlier that we have three cases:

1.  If `proxy_condition` is equal to `A` then we send traffic to `A_CONDITION_URL`
2.  If `proxy_condition` is equal to `B` then we send traffic to `B_CONDITION_URL`
3.  Else send traffic to `DEFAULT_CONDITION_URL`

Embed placeholder 0.8728003761294827

#### Reverse Proxy to that URL

Finally we are onto the actual reverse proxy! In so many languages a reverse proxy would require a lot of thought and a fair amount of code or at least having to import a sophisticated library.

However Golang’s standard library makes creating a reverse proxy so simple it’s almost unbelievable. Below is essentially the only line of code you need:

```
httputil.NewSingleHostReverseProxy(url).ServeHTTP(res, req)
```

Note that in the following code we add a little extra so it can fully support SSL redirection (though not necessary):

The one time in the project it felt like Go was truly getting out of my way.

#### Start it all up

Ok now that we have this all wired up setup our application on port `1330` and our 3 simple servers on ports `1331–1333` (all in separate terminals):

1.  `source .env && go install && $GOPATH/bin/reverse-proxy-demo`

2\. `http-server -p 1331`

3\. `http-server -p 1332`

4\. `http-server -p 1333`

With all these up and ruuning we can start to send through a requests with a json body in another terminal like so:

```
curl --request GET \

  --url http://localhost:1330/ \

  --header 'content-type: application/json' \

  --data '{

    "proxy_condition": "a"

  }'
```

> _If your looking for a great HTTP request client I cannot recommend_ [_Insomnia_](https://insomnia.rest/) _enough._

and Viola we can start to see our reverse proxy directing traffic to one of our 3 servers based on what we set in the `proxy_condition` field!

![Its alive!!!](./asset-3.gif)

### Wrap Up

Go has a lot going for it but where it really struts it stuff is in these lower level network “plumbing” tasks, there’s no better language. What we’ve written here is simple, performant, reliable and very much ready for use in production.

For simple services I can see myself reaching for Go again in the future.

> 🧞‍ This is open source! you can [find it here on Github](https://github.com/bechurch/reverse-proxy-demo)

> ❤️ I only write about programming and remote work. If you [follow me on Twitter](https://www.twitter.com/bnchrch) I won’t waste your time.

<Embed src="https://upscri.be/dde502?as_embed=true" height={350} width={700} />