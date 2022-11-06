# Hello Keto

Example of [Ory Keto](https://github.com/ory/keto).

## Getting Start

```shell
$ docker-compose up
```

Let's try some command to know Keto's behaviors.

```shell
$ keto expand member Organization sslife --insecure-disable-transport-security
or :#@Organization:sslife#member
├──∋ :#@User:bob️
└──∋ :#@User:shelly️
└──∋ :#@User:shota️
└──∋ :#@Group:developer️

$ keto check User:bob view User shota --insecure-disable-transport-security
Allowed

$ keto check User:bob edit User shota --insecure-disable-transport-security
Denied

$ keto expand manager User shota --insecure-disable-transport-security                                                                                                        1 ↵
or :#@User:shota#manager
└──or :#@Organization:sslife#manager
   └──∋ :#@User:shota️

$ keto check User:shota edit User shota --insecure-disable-transport-security
Allowed

$ keto relation-tuple get --insecure-disable-transport-security --object sslife --relation member
NAMESPACE       OBJECT  RELATION NAME   SUBJECT
Organization    sslife  member          User:bob
Organization    sslife  member          User:shelly
Organization    sslife  member          User:shota
Organization    sslife  member          Group:developer
```
