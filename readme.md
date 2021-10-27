# Books Catalog

### Problem Statement

Implement a books catalog. The website should contain two views:

The list of available books, on this page you should be able to view all available books, please skip pagination
1. Book's page, on this page you can see extra books' fields.
2. Book's fields:
   1. Title 
   2. Year 
   3. Description

### Goal

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

### Important Notes

#### Kubernetes and Skaffold for Orchestration
Since this was also built with a microservices (msvcs) first approach - some orchestration mechanism was required. Given that the project needed to be portable (i.e. self-contained and no provisioning of AWS resources or other such costs):
- I've gone with local k8s (docker desktop with k8s enabled)
- Skaffold for management of resources and hot reloading of containers

It's important to note that local development with this setup was incredibly heavy (90+% of memory consumption on my local machine).
Both for end-to-end development of msvcs, and for automated CICD provisioning of PR environments, we should prefer cloud k8s like EKS with GitOps based provisioning of resources.

### TODO (as application scales)

#### State Management Layer

Options for state management:
1. Redux (Redux Toolkit) + Saga - Redux DevTools is a big plus here
2. RxJS Subjects - personal preference for mid-sized project, esp. because cleaner paradigm (imo)

#### Microservices Communication (EventBus Integrations)

As we start adding more msvcs, we need to integrate some eventing mechanism for cross msvc communication.

Options:
1. AWS SQS - past experience + comfort pick
2. NATS Streaming Server - Easy to integrate as a self-contained k8s resource
3. RabbitMQ - need to try
4. Kafka - need to try
