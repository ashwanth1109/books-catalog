# Books Catalog

## Getting started

1. Navigate to the root of the repo
2. Start books microservice with command: `./start.sh books`
3. Once you see, server ready message, you can navigate to [GraphQL Explorer](http://localhost:4001/api/books/graphql) to query your server.
4. Once your server is running, in a different terminal window, start react client: `./start.sh client` and navigate to [React Application](http://localhost:4000)

## Other commands:

1. Start db: `./start.sh db` (note that `./start.sh books` already handles this for you)
2. Run lint for entire project: `./start.sh lint`
3. Run UTs + Snapshots for client, ITs for microservice: `./start.sh test`

## Problem Statement

Implement a books catalog. The website should contain two views:

The list of available books, on this page you should be able to view all available books, please skip pagination
1. Book's page, on this page you can see extra books' fields.
2. Book's fields:
    1. Title
    2. Year
    3. Description

## Demo

To be added

## Goal

Build a books catalog covering as much of the following :
- [x] React
- [x] TypeScript
- [x] NodeJS
- [x] Express
- [x] Jest
- [ ] Styled Components (using TailwindCSS instead)
- [ ] gRpc
- [x] Type-GraphQL
- [ ] Lerna
- [x] Antd
- [x] PostCSS
- [x] SSR (using Next.JS)
- [x] MongoDB
- [x] Docker
- [x] Nginx
- [ ] RabbitMQ
- [ ] Redis

## Important Notes

### Kubernetes and Skaffold for Orchestration
Since this was also built with a microservices (msvcs) first approach - some orchestration mechanism was required. Given that the project needed to be portable (i.e. self-contained and no provisioning of AWS resources or other such costs):
- I've gone with local k8s (docker desktop with k8s enabled)
- Skaffold for management of resources and hot reloading of containers

It's important to note that local development with this setup was incredibly heavy (90+% of memory consumption on my local machine).
Both for end-to-end development of msvcs, and for automated CICD provisioning of PR environments, we should prefer cloud k8s like EKS with GitOps based provisioning of resources.

After some experimentation, I finally set up an alternative, much easier setup which can be readily containerized if need be.

### State Management Layer

Options for state management:
1. Redux (Redux Toolkit) + Saga - Redux DevTools is a big plus here
2. RxJS Subjects - personal preference for mid-sized project, esp. because cleaner paradigm

Having worked with React and Angular in the past, the state management solution takes inspiration from the best of both worlds and uses RxJS subjects at its core.

### Microservices Communication (EventBus Integrations)

As we start adding more msvcs, we need to integrate some eventing mechanism for cross msvc communication.

Options:
1. AWS SQS - past experience + comfort pick
2. NATS Streaming Server - Easy to integrate as a self-contained k8s resource
3. RabbitMQ - need to try
4. Kafka - need to try
