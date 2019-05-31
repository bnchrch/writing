---
title: "Publish a elixir library that broadcasts all repo insert updates and deletes (The big elixir talk)"
description: "show how pattern matching and genservers can make for a robust notification system"
date: "2019-05-31T19:14:06.739Z"
categories: []
published: false
---

show how pattern matching and genservers can make for a robust notification system

create a library from this that makes this functionality easy.

this library would extend repos function to `Broadcast.Repo.insert` or `Repo.broadcast_insert` or something….

this library could also use a macro to help define the genserver in a much easier way. perhaps

```
# mix.exs
extra_applications = [..., :simple_listener]

# listeners/something.ex
defmodule SomeOnesListener do
  use SimpleListener
  
  def handle_info(%Appointment{}, :update, %{...} = new, %{...} = old) do
    # ...
  end
  def handle_info(%Appointment{}, :insert, %{...} = new, _old) do
    # ...
  end
end
```

you could show how one genserver to house your notifications is easy but you can easily expand it to be a genserver per notification type.