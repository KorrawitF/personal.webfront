export default function getSkillDomains(): SkillDomain[] {
    return [
        {
            id: "languages",
            name: "Languages",
            color: "#34d399",
            summary: "The languages I write production code in, and the parts of each one I have actually leaned on.",
            skills: [
                {
                    id: "go",
                    name: "Golang",
                    level: 5,
                    icon: "/Go.svg",
                    summary: "My default for anything that has to stay up: HTTP and gRPC services, Kafka consumers, and the small CLIs that keep operations moving.",
                    tools: ["Gin", "Echo", "sqlc", "testify", "golangci-lint"],
                    use_cases: [
                        "REST and gRPC services carrying warehouse and payment traffic",
                        "Kafka consumers that need predictable memory over long runs",
                        "One-off CLIs for backfills and data repairs, handed to the ops team",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Warehouse Management System",
                            org: "BJC (Big C)",
                            detail: "Split a legacy monolith into Go services for goods receipt, putaway, picking and cycle counting, serving hundreds of concurrent handheld terminals.",
                        },
                        {
                            id: 2,
                            title: "Banking Integration Gateway",
                            org: "BJC (Big C)",
                            detail: "One internal contract in front of several partner banks, with a per-bank adapter, shared retries and signed audit records behind it.",
                        },
                    ],
                },
                {
                    id: "go-concurrency",
                    name: "Concurrency",
                    parent: "go",
                    level: 5,
                    summary: "Goroutines are cheap; the database pool behind them is not. Most of my concurrency work is about bounding fan-out and shutting down cleanly.",
                    tools: ["goroutines", "channels", "errgroup", "context", "go test -race"],
                    use_cases: [
                        "Bounded worker pools so a burst of picking requests cannot exhaust the connection pool",
                        "Pipelines with backpressure for document ingestion",
                        "Graceful shutdown that drains in-flight work before the pod exits",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Picking API latency",
                            org: "Warehouse Management System",
                            detail: "Replaced per-request queries with a bounded worker pool and batched lookups, taking average picking latency from around 800ms to under 150ms.",
                        },
                    ],
                },
                {
                    id: "go-grpc",
                    name: "gRPC & Protobuf",
                    parent: "go-concurrency",
                    level: 4,
                    summary: "Service-to-service contracts that survive both sides being deployed independently.",
                    tools: ["protobuf", "grpc-go", "buf", "protoc-gen-validate"],
                    use_cases: [
                        "Internal contracts between services owned by different teams",
                        "Streaming stock updates down to handheld terminals",
                        "Backwards-compatible schema changes checked in CI",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Internal service contracts",
                            org: "Warehouse Management System",
                            detail: "Moved the chattiest internal calls off JSON onto gRPC, with buf linting and breaking-change checks in the pipeline.",
                        },
                    ],
                },
                {
                    id: "php",
                    name: "PHP",
                    level: 4,
                    summary: "The language most of the ERP I worked on was written in, and where I learned to change code a whole finance team depends on.",
                    tools: ["PHP 8", "Composer", "PHPUnit", "Xdebug"],
                    use_cases: [
                        "Extending ERP modules already in daily use",
                        "Carving seams into a monolith so pieces can move to Go",
                        "Keeping a decade of business rules working through upgrades",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "ERP Module Suite",
                            org: "BJC (Big C)",
                            detail: "Purchasing, inventory and finance modules, from schema and migrations up to the API the Vue screens call.",
                        },
                    ],
                },
                {
                    id: "laravel",
                    name: "Laravel",
                    parent: "php",
                    level: 4,
                    summary: "Queues, policies, migrations and Eloquent - the parts of Laravel that carry an ERP rather than a blog.",
                    tools: ["Eloquent", "Laravel Queues", "Horizon", "Policies", "Artisan"],
                    use_cases: [
                        "Role-based approval flows for purchase orders",
                        "Long-running exports pushed onto queues instead of blocking a request",
                        "Audit trails written on every document state change",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Purchasing approvals",
                            org: "ERP Module Suite",
                            detail: "Approval chains expressed as policies and queued jobs, with an exportable trail of who approved what and when.",
                        },
                    ],
                },
                {
                    id: "python",
                    name: "Python",
                    level: 3,
                    icon: "/Python.svg",
                    summary: "My glue language: document pipelines, data fixes and the scripts nobody wants to write twice.",
                    tools: ["FastAPI", "pandas", "Celery", "pytest"],
                    use_cases: [
                        "Extraction pipelines over supplier PDFs and scans",
                        "Data migration and reconciliation scripts",
                        "Internal tools that never justified a full service",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "AI Document Automation",
                            org: "BJC (Big C)",
                            detail: "Queued extraction over incoming supplier documents, validated against master data and routed to a human when confidence was low.",
                        },
                    ],
                },
                {
                    id: "python-automation",
                    name: "Automation Scripts",
                    parent: "python",
                    level: 3,
                    summary: "Small, boring programs that remove a recurring manual job and then get handed over with a README.",
                    tools: ["Click", "cron", "openpyxl", "requests"],
                    use_cases: [
                        "Nightly reconciliation between the ERP and partner statements",
                        "Bulk master-data corrections after a bad import",
                        "Reports the finance team used to assemble by hand",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Reconciliation jobs",
                            org: "Banking Integration Gateway",
                            detail: "Scheduled jobs comparing gateway records against bank statements, alerting on any mismatch left at the end of a run.",
                        },
                    ],
                },
                {
                    id: "typescript",
                    name: "TypeScript",
                    level: 4,
                    icon: "/TypeScript.svg",
                    summary: "Types as the contract between the front end and whatever backend it talks to, rather than as decoration.",
                    tools: ["TypeScript 5", "ESLint", "Vitest", "tsc --strict"],
                    use_cases: [
                        "Typed API clients generated from the backend contract",
                        "Component libraries kept honest under strict mode",
                        "Refactors where the compiler finds the callers for me",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "This portfolio",
                            org: "Solo project",
                            detail: "Strict TypeScript across server and client components, with shared ambient types describing every page's data.",
                        },
                    ],
                },
                {
                    id: "node",
                    name: "Node & Nest.js",
                    parent: "typescript",
                    level: 3,
                    icon: "/Nest.js.svg",
                    summary: "Services on the Node side of the fence, mostly where the team was already TypeScript-first.",
                    tools: ["Node.js", "Nest.js", "Prisma", "Jest"],
                    use_cases: [
                        "BFF layers shaping backend responses for one specific screen",
                        "Webhook receivers and small integrations",
                        "Scheduled jobs living next to the front end that needs them",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Internal integrations",
                            org: "Ascend Group",
                            detail: "Nest.js services in front of third-party APIs, giving the web team one shape to code against.",
                        },
                    ],
                },
                {
                    id: "rust",
                    name: "Rust",
                    level: 0,
                    summary: "On the roadmap. I want it for the places where Go's garbage collector is the thing in the way, not as a rewrite for its own sake.",
                    tools: ["cargo", "tokio", "axum"],
                    use_cases: [
                        "Latency-sensitive consumers where GC pauses show up in the p99",
                        "CLI tooling that has to ship as a single static binary",
                    ],
                    experiences: [],
                },
            ],
        },
        {
            id: "infrastructure",
            name: "Infrastructure",
            color: "#f59e0b",
            summary: "How the services get packaged, scheduled and given a network to live on.",
            skills: [
                {
                    id: "docker",
                    name: "Docker",
                    level: 5,
                    icon: "/Docker.svg",
                    summary: "Multi-stage builds, small final images, and a compose file that gets a new joiner running the stack before lunch.",
                    tools: ["Dockerfile", "Docker Compose", "BuildKit", "distroless"],
                    use_cases: [
                        "Multi-stage Go builds down to a handful of megabytes",
                        "Local stacks with the database, Kafka and Redis a service expects",
                        "CI builds that produce the same image the pipeline ships",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Local development stacks",
                            org: "BJC (Big C)",
                            detail: "Compose files covering Postgres, Kafka and Redis, so every service could be run and tested off-cluster.",
                        },
                    ],
                },
                {
                    id: "kubernetes",
                    name: "Kubernetes",
                    parent: "docker",
                    level: 4,
                    icon: "/Kubernetes.svg",
                    summary: "Deployments, probes, autoscaling and the resource limits that decide whether a rollout is boring or an incident.",
                    tools: ["kubectl", "HPA", "ConfigMaps & Secrets", "k9s"],
                    use_cases: [
                        "Zero-downtime rollouts behind readiness and liveness probes",
                        "Horizontal autoscaling driven by real traffic patterns",
                        "Debugging pod-level failures: OOM kills, evictions, crash loops",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "WMS service rollout",
                            org: "BJC (Big C)",
                            detail: "Warehouse services deployed on Kubernetes with zero-downtime rollouts and autoscaling tuned to the shift pattern of the warehouses.",
                        },
                    ],
                },
                {
                    id: "helm-argo",
                    name: "Helm & Argo CD",
                    parent: "kubernetes",
                    level: 4,
                    icon: "/Argo CD.svg",
                    summary: "One base chart every service inherits, and Git as the only way anything reaches the cluster.",
                    tools: ["Helm", "Argo CD", "Kustomize", "app-of-apps"],
                    use_cases: [
                        "A shared chart covering probes, autoscaling and resource defaults",
                        "GitOps rollouts with automatic rollback on failed health checks",
                        "Per-environment values without forking the chart",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Platform tooling",
                            org: "Side project",
                            detail: "New services get metrics, logs, alerts and a deploy pipeline from a single manifest instead of copied config.",
                        },
                    ],
                },
                {
                    id: "terraform",
                    name: "Terraform",
                    parent: "kubernetes",
                    level: 3,
                    icon: "/HashiCorp Terraform.svg",
                    summary: "The cluster and everything around it described in code, so the second environment is a variable file rather than a weekend.",
                    tools: ["Terraform", "modules", "remote state", "plan in CI"],
                    use_cases: [
                        "Cluster, networking and add-ons provisioned as code",
                        "Reviewed plans in merge requests before anything is applied",
                        "Rebuilding a whole environment from scratch on demand",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Cluster provisioning",
                            org: "Kubernetes Platform Tooling",
                            detail: "Modules for the cluster, ingress, certificate management and the observability stack, applied through the pipeline only.",
                        },
                    ],
                },
                {
                    id: "linux",
                    name: "Linux & Networking",
                    level: 4,
                    summary: "The layer under everything else: processes, file descriptors, DNS, TLS and where the packet actually stopped.",
                    tools: ["systemd", "NGINX", "tcpdump", "dig", "openssl"],
                    use_cases: [
                        "Tracing connection resets between a service and a partner API",
                        "Ingress, TLS termination and certificate rotation",
                        "Tuning file descriptor and connection limits under load",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Partner connectivity",
                            org: "Banking Integration Gateway",
                            detail: "Diagnosed TLS and timeout failures against bank endpoints, then made the client behaviour explicit instead of relying on defaults.",
                        },
                    ],
                },
                {
                    id: "service-mesh",
                    name: "Service Mesh",
                    parent: "kubernetes",
                    level: 0,
                    summary: "On the roadmap. I have read enough to know I want mTLS and traffic shifting without every service implementing them itself.",
                    tools: ["Istio", "Linkerd", "Envoy"],
                    use_cases: [
                        "Mutual TLS between services without touching application code",
                        "Canary traffic shifting driven by metrics",
                    ],
                    experiences: [],
                },
            ],
        },
        {
            id: "messaging",
            name: "Messaging",
            color: "#f43f5e",
            summary: "Moving work between services without losing it, duplicating it, or letting one slow consumer take down the rest.",
            skills: [
                {
                    id: "kafka",
                    name: "Kafka",
                    level: 4,
                    icon: "/Apache Kafka.svg",
                    summary: "Partitioning, consumer groups, offset handling and the retention settings that decide what a replay can still reach.",
                    tools: ["Apache Kafka", "Kafka Connect", "kafka-go", "AKHQ"],
                    use_cases: [
                        "Partition keys chosen so per-document ordering survives scaling out",
                        "Consumer groups sized against real lag instead of guesswork",
                        "Dead letter topics with a documented replay path",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Event backbone",
                            org: "BJC (Big C)",
                            detail: "Kafka as the spine between warehouse, ERP and storefront, with lag alerting per consumer group.",
                        },
                    ],
                },
                {
                    id: "event-driven",
                    name: "Event-Driven Design",
                    parent: "kafka",
                    level: 4,
                    summary: "Deciding what an event means, who owns it, and how a consumer catches up after being down for an hour.",
                    tools: ["event storming", "CQRS read models", "consumer contracts"],
                    use_cases: [
                        "Events named after business facts rather than table rows",
                        "Read models rebuilt from the log after a schema change",
                        "Ownership boundaries that stop one team's refactor breaking another's consumer",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Warehouse read models",
                            org: "Warehouse Management System",
                            detail: "Read models in Postgres kept current from the event log, so reporting queries never touched the transactional path.",
                        },
                    ],
                },
                {
                    id: "outbox",
                    name: "Outbox & Idempotency",
                    parent: "event-driven",
                    level: 4,
                    summary: "The two patterns that make retries safe: write the event in the same transaction as the data, and make every handler safe to run twice.",
                    tools: ["transactional outbox", "idempotency keys", "dedup tables"],
                    use_cases: [
                        "Exactly-once semantics per business document on top of at-least-once delivery",
                        "Safe retries against partner APIs that may already have accepted the request",
                        "No published event without the row it describes, and no row without its event",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Payment retries",
                            org: "Banking Integration Gateway",
                            detail: "Idempotency keys plus an outbox, so a timeout on a payment call could be retried without any risk of double submission.",
                        },
                    ],
                },
                {
                    id: "schema-registry",
                    name: "Schema Registry",
                    parent: "kafka",
                    level: 3,
                    summary: "Message schemas versioned and checked in CI, so a producer cannot break every consumer with one merge.",
                    tools: ["Avro", "Protobuf", "Schema Registry", "compatibility checks"],
                    use_cases: [
                        "Backwards-compatible event evolution across teams",
                        "Contract checks that fail the pipeline, not production",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Event contracts",
                            org: "BJC (Big C)",
                            detail: "Schemas registered per topic with compatibility rules enforced before a producer could deploy.",
                        },
                    ],
                },
                {
                    id: "redis-streams",
                    name: "Redis Streams",
                    level: 3,
                    icon: "/Redis.svg",
                    summary: "For work that needs a queue but not a whole Kafka cluster: notifications, retries and short-lived jobs.",
                    tools: ["Redis Streams", "Pub/Sub", "consumer groups"],
                    use_cases: [
                        "Background jobs where the payload lives for minutes, not weeks",
                        "Fan-out notifications to connected clients",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Document processing queue",
                            org: "AI Document Automation",
                            detail: "Incoming documents queued through Redis, with a consumer group per stage of the extraction pipeline.",
                        },
                    ],
                },
            ],
        },
        {
            id: "data",
            name: "Data Stores",
            color: "#38bdf8",
            summary: "Where the state lives, how it is shaped, and how it stays fast once there is a lot of it.",
            skills: [
                {
                    id: "postgres",
                    name: "PostgreSQL",
                    level: 5,
                    icon: "/PostgresSQL.svg",
                    summary: "My default database. Transactions, JSONB where it earns its place, materialised views, and honest use of EXPLAIN.",
                    tools: ["PostgreSQL", "psql", "pgx", "pg_stat_statements"],
                    use_cases: [
                        "Transactional writes for stock movements and payment records",
                        "Materialised views for reports that used to time out",
                        "Row-level locking to keep concurrent document updates correct",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Month-end reporting",
                            org: "ERP Module Suite",
                            detail: "Moved heavy aggregations to materialised views refreshed on a schedule, cutting month-end report generation from minutes to seconds.",
                        },
                    ],
                },
                {
                    id: "query-tuning",
                    name: "Query Tuning",
                    parent: "postgres",
                    level: 4,
                    summary: "Start with the plan, not the index. Most of the wins came from removing work rather than adding structure.",
                    tools: ["EXPLAIN ANALYZE", "pg_stat_statements", "partial indexes", "auto_explain"],
                    use_cases: [
                        "Finding the query behind a p99 spike instead of guessing at it",
                        "Partial and composite indexes matched to real predicates",
                        "Killing N+1 patterns left behind by an ORM",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Picking lookups",
                            org: "Warehouse Management System",
                            detail: "Rewrote the hot picking queries and indexed them against the actual access pattern, which carried most of the latency drop.",
                        },
                    ],
                },
                {
                    id: "mysql",
                    name: "MySQL",
                    level: 4,
                    icon: "/MySQL.svg",
                    summary: "The database the ERP came with. Years of live schema changes taught me to treat a migration as a deploy risk of its own.",
                    tools: ["MySQL 8", "InnoDB", "mysqldump", "Percona toolkit"],
                    use_cases: [
                        "Online schema changes on tables the business writes to all day",
                        "Deadlock and lock-wait investigations",
                        "Replication-aware read splitting for reports",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "ERP schema work",
                            org: "ERP Module Suite",
                            detail: "Schema and migrations for purchasing, inventory and finance, rolled out without stopping the teams using them.",
                        },
                    ],
                },
                {
                    id: "schema-design",
                    name: "Schema & Migrations",
                    parent: "mysql",
                    level: 4,
                    summary: "Expand, backfill, contract. Every migration is written so the previous version of the code still runs against it.",
                    tools: ["golang-migrate", "Laravel migrations", "expand/contract"],
                    use_cases: [
                        "Zero-downtime column and table changes",
                        "Backfills run in batches instead of one long transaction",
                        "Rollback paths written before the migration ships",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Live migrations",
                            org: "BJC (Big C)",
                            detail: "Migrations shipped alongside the services that needed them, versioned in the same repository and applied by the pipeline.",
                        },
                    ],
                },
                {
                    id: "redis",
                    name: "Redis",
                    level: 4,
                    icon: "/Redis.svg",
                    summary: "In front of the hottest lookups, and for the locks and counters that do not belong in a relational table.",
                    tools: ["Redis", "go-redis", "TTL policies", "Redlock"],
                    use_cases: [
                        "Caching master data that is read constantly and written rarely",
                        "Distributed locks around document-level operations",
                        "Rate limiting per partner and per terminal",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Hot lookups",
                            org: "Warehouse Management System",
                            detail: "Redis in front of the product and location lookups every handheld scan needed, with invalidation driven by the stock events.",
                        },
                    ],
                },
                {
                    id: "caching",
                    name: "Caching Strategy",
                    parent: "redis",
                    level: 4,
                    summary: "The cache is easy; the invalidation is the design. I prefer event-driven invalidation over hopeful TTLs.",
                    tools: ["cache-aside", "event invalidation", "singleflight"],
                    use_cases: [
                        "Cache-aside with stampede protection on cold keys",
                        "Invalidation triggered by the event that changed the data",
                        "Deliberate staleness budgets, written down per cache",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Master data cache",
                            org: "Warehouse Management System",
                            detail: "Consumers invalidated cached master data on the same events that changed it, so terminals never scanned against a stale location.",
                        },
                    ],
                },
                {
                    id: "mongodb",
                    name: "MongoDB",
                    level: 3,
                    icon: "/MongoDB.svg",
                    summary: "Used where documents genuinely differ from each other: extraction output, audit payloads, partner responses kept verbatim.",
                    tools: ["MongoDB", "aggregation pipeline", "mongo-driver"],
                    use_cases: [
                        "Storing raw extraction results next to the structured record",
                        "Audit payloads whose shape depends on the partner",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Extraction output",
                            org: "AI Document Automation",
                            detail: "Kept the raw model output alongside the structured line items, so a reviewer could always trace a field back to its source snippet.",
                        },
                    ],
                },
            ],
        },
        {
            id: "delivery",
            name: "Delivery & Ops",
            color: "#a78bfa",
            summary: "Getting a change from a merge request into production, and knowing what it did once it arrived.",
            skills: [
                {
                    id: "gitlab",
                    name: "GitLab CI",
                    level: 4,
                    icon: "/GitLab.svg",
                    summary: "Where most of my pipelines live: templated stages, cached builds, and no deploy step a human has to remember.",
                    tools: ["GitLab CI", "pipeline templates", "runners", "review apps"],
                    use_cases: [
                        "Shared templates so every service pipeline looks the same",
                        "Merge-request pipelines running tests, lint and vulnerability scans",
                        "Tag-driven releases handed over to Argo CD",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Service pipelines",
                            org: "BJC (Big C)",
                            detail: "Templated pipelines covering build, test, image scan and deploy for the Go services and the ERP alike.",
                        },
                    ],
                },
                {
                    id: "jenkins",
                    name: "Jenkins",
                    parent: "gitlab",
                    level: 3,
                    icon: "/Jenkins.svg",
                    summary: "Inherited pipelines on older projects - maintained, gradually simplified, and in places migrated off.",
                    tools: ["Jenkins", "Jenkinsfile", "shared libraries"],
                    use_cases: [
                        "Keeping legacy build jobs alive during a migration",
                        "Shared library steps so jobs stop drifting apart",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Legacy build jobs",
                            org: "BJC (Big C)",
                            detail: "Maintained the ERP's Jenkins jobs while new services moved onto GitLab CI.",
                        },
                    ],
                },
                {
                    id: "grafana",
                    name: "Grafana & Prometheus",
                    level: 4,
                    icon: "/Grafana.svg",
                    summary: "Metrics chosen per service, dashboards checked in beside the code, and panels that answer a question someone actually asks during an incident.",
                    tools: ["Grafana", "Prometheus", "PromQL", "Loki"],
                    use_cases: [
                        "RED metrics on every service endpoint",
                        "Consumer lag and queue depth on the same dashboard as latency",
                        "Log and metric correlation while an incident is still open",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Service dashboards",
                            org: "Kubernetes Platform Tooling",
                            detail: "Dashboards checked in beside the service code, with panels for latency, error rate, consumer lag and queue depth.",
                        },
                    ],
                },
                {
                    id: "slo",
                    name: "Alerting & SLOs",
                    parent: "grafana",
                    level: 3,
                    summary: "Alerts tied to what users feel, with enough context in the message that whoever is paged knows where to look.",
                    tools: ["Alertmanager", "error budgets", "runbooks"],
                    use_cases: [
                        "Latency and error-rate objectives per service",
                        "Symptom-based alerting instead of one alert per metric",
                        "Runbook links attached to every alert that can page someone",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Reconciliation alerting",
                            org: "Banking Integration Gateway",
                            detail: "End-to-end reconciliation reports with alerts on any mismatch left unresolved at the end of a cycle.",
                        },
                    ],
                },
                {
                    id: "vault",
                    name: "HashiCorp Vault",
                    level: 3,
                    icon: "/HashiCorp Vault.svg",
                    summary: "Secrets and signing keys kept out of the repository and out of the pipeline variables, and rotated without a redeploy.",
                    tools: ["HashiCorp Vault", "dynamic secrets", "AppRole"],
                    use_cases: [
                        "Per-bank signing keys held and rotated centrally",
                        "Short-lived database credentials issued per service",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Partner credentials",
                            org: "Banking Integration Gateway",
                            detail: "Bank credentials and signing keys stored in Vault and rotated without taking the gateway down.",
                        },
                    ],
                },
                {
                    id: "tracing",
                    name: "Distributed Tracing",
                    parent: "grafana",
                    level: 0,
                    summary: "On the roadmap. Metrics and logs have carried me this far; spans are the missing piece when a request crosses five services.",
                    tools: ["OpenTelemetry", "Tempo", "Jaeger"],
                    use_cases: [
                        "Following one request across service boundaries",
                        "Finding which hop owns the latency, without reading four dashboards",
                    ],
                    experiences: [],
                },
            ],
        },
        {
            id: "frontend",
            name: "Frontend",
            color: "#f472b6",
            summary: "Enough front end to take a feature all the way to the screen the user actually touches.",
            skills: [
                {
                    id: "react",
                    name: "React",
                    level: 4,
                    summary: "Hooks, composition, and keeping state where it belongs - which is usually further up, or on the server.",
                    tools: ["React 19", "TanStack Query", "Storybook", "Vitest"],
                    use_cases: [
                        "Interactive components layered onto server-rendered pages",
                        "Server state handled by a query cache rather than hand-rolled effects",
                        "Components documented in Storybook and tested in a real browser",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "This portfolio",
                            org: "Solo project",
                            detail: "Client components only where interaction needs them: the navbar, the flip cards and this skill tree.",
                        },
                    ],
                },
                {
                    id: "nextjs",
                    name: "Next.js",
                    parent: "react",
                    level: 4,
                    icon: "/Next.js.svg",
                    summary: "App Router, server-first rendering, and dropping to the client only where an interaction demands it.",
                    tools: ["Next.js 16", "App Router", "Server Actions", "next/font"],
                    use_cases: [
                        "Statically rendered pages with interactive islands",
                        "Form submissions handled by server actions instead of a bespoke API route",
                        "Layouts and metadata defined per route segment",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "This portfolio",
                            org: "Solo project",
                            detail: "A playground for the newest App Router features: cache components, server actions and per-segment layouts.",
                        },
                    ],
                },
                {
                    id: "rsc",
                    name: "Server Components",
                    parent: "nextjs",
                    level: 3,
                    summary: "Deciding what genuinely has to reach the browser, and keeping the rest on the server where it costs nothing.",
                    tools: ["React Server Components", "use cache", "streaming"],
                    use_cases: [
                        "Data fetched at the source and rendered before it ships",
                        "Client bundles kept small by pushing the boundary down the tree",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "Cache components",
                            org: "This portfolio",
                            detail: "Pages render ahead of time with cache components enabled; only the interactive pieces are client components.",
                        },
                    ],
                },
                {
                    id: "vue",
                    name: "Vue.js",
                    level: 4,
                    icon: "/Vue.js.svg",
                    summary: "The framework behind the ERP screens I shipped: composition API, Pinia, and forms with real validation rules.",
                    tools: ["Vue 3", "Composition API", "Pinia", "Vite"],
                    use_cases: [
                        "Data-dense internal screens with heavy forms",
                        "Shared components across the purchasing, inventory and finance modules",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "ERP front end",
                            org: "ERP Module Suite",
                            detail: "Purchasing and finance screens, including the approval flows and the exportable audit trail behind them.",
                        },
                    ],
                },
                {
                    id: "tailwind",
                    name: "Tailwind CSS",
                    level: 4,
                    icon: "/Tailwind CSS.svg",
                    summary: "Utility classes with the theme kept in CSS variables, so a colour change is one line rather than a search across components.",
                    tools: ["Tailwind CSS v4", "CSS variables", "PostCSS"],
                    use_cases: [
                        "Design tokens defined once and themed from CSS variables",
                        "Responsive layouts that fit the viewport instead of scrolling the page",
                    ],
                    experiences: [
                        {
                            id: 1,
                            title: "This portfolio",
                            org: "Solo project",
                            detail: "Tailwind v4 with the palette in CSS variables, shared by every page and the Storybook build.",
                        },
                    ],
                },
            ],
        },
    ];
}

export async function getSkillsContent(): Promise<SkillsContent> {
    return {
        header: {
            title: "Skills",
            lead: "One tree per domain, rooted in the thing it all grows from and branching into the specifics. Pick any node to see the tools behind it, what I use it for, and where it has actually shipped. Dashed nodes are on the roadmap rather than on my CV.",
        },
        detail: {
            levels: [
                "On the roadmap",
                "Familiar",
                "Working knowledge",
                "Proficient",
                "Advanced",
                "Daily driver",
            ],
            tools: "Tools",
            use_cases: "Use cases",
            experience: "Experience",
            no_experience: "Nothing shipped with this yet — it is on the list, not on my CV.",
        },
        domains: getSkillDomains(),
    };
}
