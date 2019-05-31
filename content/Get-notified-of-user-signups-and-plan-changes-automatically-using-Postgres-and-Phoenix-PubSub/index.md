---
title: "Get notified of user signups and plan changes automatically using Postgres & Phoenix PubSub"
description: "A lot of time you need to make a system that can send out notifications to yourself or other users based on events, specifically events related to changes in your database. Postgres and Phoenix make…"
date: "2018-04-02T02:23:32.240Z"
categories: 
  - Elixir
  - Phoenix Framework
  - Notifications
  - Postgres
  - Software Development

published: true
canonicalLink: https://hackernoon.com/get-notified-of-user-signups-and-plan-changes-automatically-using-postgres-phoenix-pubsub-e67d061b04bc
---

![A look in to the future 🔮](./asset-1.png)

A lot of time you need to make a system that can send out **notifications** to yourself or other users **based on events**, specifically events related to changes in your database. **Postgres** and **Phoenix** make this ridiculously easy.

By the end of this **short** post you will have:

1.  Setup a Phoenix 1.3 project
2.  Setup a broadcast function and trigger in Postgres
3.  Used a GenServer to listen for broadcasts from Postgres
4.  Used Bamboo to send emails to yourself when users signs up or changes their payment plan.

### Getting Setup

#### Before you start

Please make sure you have the following installed and/or ready to go:

1.  [Elixir](https://elixir-lang.org/install.html)
2.  [Phoenix](https://hexdocs.pm/phoenix/installation.html)
3.  [PostgreSQL](https://www.postgresql.org/download/)
4.  A valid [SendGrid](http://www.sendgrid.com) account

#### Initialize the project

Lets create a new Phoenix 1.3 project called `pub_sub_demo`

```
mix phx.new pub_sub_demo

cd pub_sub_demo

mix ecto.create
```

#### Add Two Additional Dependencies

Next we want to add `HTTPoison` to help with decoding strings sent from the database and `Bamboo` to help us send emails.

To do this in your `mix.exs` file add the following to your `deps`:

```
{:httpoison, "~> 1.0"},
{:bamboo, "~> 0.8"}
```

Also update the `extra_applications` section to include `:bamboo`

```
extra_applications: [:logger, :runtime_tools, :bamboo]
```

#### Create a model

Finally lets create the `User` model we will be using to show off all of this broadcasting goodness.

```
mix phx.gen.context Accounts User users name:string payment_plan:string
```

_Note: We created the_ `_User_` _in a new context called_ `_Accounts_`_. If you are unfamiliar with contexts they are nothing to be afraid of just a convention phoenix uses to group functionality. They are not special, just a way to bag functions together._

#### Kick it off!

Migrate the database, grab your dependencies and lets go!

```
mix ecto.migrate
mix deps.get
mix phx.server
```

_Note: You should now be able to navigate to_ `_localhost:4000_` _and see your application running. Though for the purposes of this demo you wont really be viewing any screens._

### Broadcast Changes with Postgres

The whole idea of this is for Postgres to let **_US_** know when things have changed. To do so we need to set up two things:

1.  A function that takes an action (`INSERT`, `UPDATE`, `DELETE`) performed on a row for the purpose of broadcasting it outside of the database.
2.  A trigger that calls this function when an action has occurred on a specific table.

#### Create the Ecto Migration

```
mix ecto.gen.migration broadcast_users_table_changes
```

#### Add the Function and Trigger

Update the migration file you created above to include the following

Embed placeholder 0.7549029666461695

_If you want to better understand what is occurring here check out this blog post by @kaisersly which largely is the inspiration for what you are reading here:_

[_https://medium.com/@kaisersly/postgrex-notifications-759574f5796e_](https://medium.com/@kaisersly/postgrex-notifications-759574f5796e)

### Listen for Changes

Now that we have our database broadcasting changes that occur on our `users` table we need to be able to listen and act on the same channel. Thankfully Postgrex provides this by default using `Postgrex.Notifications`.

To use this we must create a `GenServer` responsible for listening to `Postgrex` and acting on the messages broadcast.

#### Creating our GenServer

Create the file `lib/pub_sub_demo/pub_sub/listener.ex` and populate it with the following:

Embed placeholder 0.5754299125823257

For now all that this does is listen on a channel provided and log the messages broadcast to that channel.

Next lets configure this as a Worker and give it the channel it will listen to.

#### Hook up the listener

Update the `application.ex` file so that it starts the `Listener` we just defined with the appropriate `users_changes` channel.

Embed placeholder 0.05514203630178938

#### See it in Action

You should now be able to start your application again by running:

```
mix ecto.migrate
mix phx.server
```

Then any change you make to the `users` table via Postgres’s CLI should be output to our Applications `stdout`.

![](./asset-2.png)

### Listening for Specific Actions

While it’s nice to be able to see **_everything_**  that occurs in the database often we only care about a small subset of these changes. Specifically for this demo:

1.  User created
2.  User subscription updated

Luckily Elixir’s pattern matching provides a wonderfully simple way to cut down on all the noise and focus exactly on the shape of data you’re looking for.

What we want to do is update `handle_info` to send the payload to a function that will match on the events that matter.

Embed placeholder 0.4547863736697928

The above only acts on only the exact events we are looking for and outputs a specific message to our log. Anything else is ignored.

![](./asset-3.png)

### Link it up to an email service

Standard out is nice but in a running application you don’t want to be combing logs for events that your business cares about, you want to be notified in realtime.

Lets hook our messages up to an email provider so that we get a notification right in our inbox when a user signs up or upgrades their plan.

The `Bamboo` Elixir library and `Send Grid` service make this far too easy.

#### Setup Bamboo

Add the following to your `config.exs` file

Embed placeholder 0.8017584005024856

_Note: Bamboo offers many more adapters than just Send Grid if you have a different preference._ [_https://github.com/thoughtbot/bamboo#adapters_](https://github.com/thoughtbot/bamboo#adapters)

Create a `mailer.ex` file in your `pub_sub_demo` folder

Embed placeholder 0.05276519700342708

#### Sending emails from our Listener

Update `handle_user_changes` in `listener.ex` to send our log messages to our own email address.

Embed placeholder 0.27025299159465876

### Run it for a Final Time

Now if you create or update a user in your `users` table you should see emails appear in your SendGrid logs.

![](./asset-4.png)

Thats it!

### Conclusion

The concept of broadcasting events directly from your database isn’t something new and as a result this type of functionality is available to you in any language and framework.

But! The core features and functionality of Elixir and Phoenix make using database events much easier and more reasonable than I have found in any other system. Pattern Matching and OTP principles are both simple and powerful and I encourage anyone to take a deep dive into them when possible.

![](./asset-5.gif)

> 🧞‍ This is open source! you can [find it here on Github](https://github.com/bechurch/pub_sub_demo)

> ❤️ I only write about programming and remote work. If you [follow me on Twitter](https://www.twitter.com/bnchrch) I won’t waste your time.