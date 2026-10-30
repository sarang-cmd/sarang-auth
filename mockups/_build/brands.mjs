// Resolve the brand list against the bundled icon packs, write one SVG per
// brand plus a JSON registry, and expose an inline helper for the mockups.
//
// Sources, in order: Simple Icons (monochrome, official marks) and SVG Logos
// (full colour). Both are installed from npm, so no network is needed.
// logo.dev and Brandfetch keys are optional; see fetch-logos.mjs.

import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { groups, extras } from "./brand-slugs.mjs";

const require = createRequire(import.meta.url);
const si = require("simple-icons");
const logos = require("@iconify-json/logos/icons.json");
const siPack = require("@iconify-json/simple-icons/icons.json");
const devicon = require("@iconify-json/devicon/icons.json");

const OUT = new URL("../assets/brands/", import.meta.url);
const JSON_OUT = new URL("../assets/brands.json", import.meta.url);
const INLINE_OUT = new URL("./brands-inline.mjs", import.meta.url);

// Domains worth stating exactly. Everything else is derived from the
// Simple Icons source URL, or left blank.
const domains = {
  aws: "aws.amazon.com", amazonaws: "aws.amazon.com", azure: "azure.microsoft.com",
  microsoftazure: "azure.microsoft.com", googlecloud: "cloud.google.com", digitalocean: "digitalocean.com",
  linode: "linode.com", vultr: "vultr.com", hetzner: "hetzner.com", ovh: "ovhcloud.com", scaleway: "scaleway.com",
  cloudflare: "cloudflare.com", fastly: "fastly.com", akamai: "akamai.com", netlify: "netlify.com",
  vercel: "vercel.com", render: "render.com", railway: "railway.app", flydotio: "fly.io", heroku: "heroku.com",
  kubernetes: "kubernetes.io", docker: "docker.com", terraform: "terraform.io", ansible: "ansible.com",
  pulumi: "pulumi.com", hashicorp: "hashicorp.com", nomad: "nomadproject.io", consul: "consul.io",
  packer: "packer.io", oracle: "oracle.com", ibm: "ibm.com", alibabacloud: "alibabacloud.com",
  tencentcloud: "cloud.tencent.com", upcloud: "upcloud.com", datadog: "datadoghq.com", newrelic: "newrelic.com",
  grafana: "grafana.com", prometheus: "prometheus.io", sentry: "sentry.io", honeycomb: "honeycomb.io",
  splunk: "splunk.com", elastic: "elastic.co", sumologic: "sumologic.com", pagerduty: "pagerduty.com",
  opsgenie: "opsgenie.com", incidentdotio: "incident.io", statuspage: "statuspage.io",
  betterstack: "betterstack.com", logtail: "logtail.com", axiom: "axiom.co", cloudinary: "cloudinary.com",
  imgix: "imgix.com", uploadcare: "uploadcare.com", bunnynet: "bunny.net", backblaze: "backblaze.com",
  wasabi: "wasabi.com", namecheap: "namecheap.com", godaddy: "godaddy.com", dnsimple: "dnsimple.com",
  porkbun: "porkbun.com", gandi: "gandi.net", fastmail: "fastmail.com", equinix: "equinix.com",
  rackspace: "rackspace.com", supabase: "supabase.com", firebase: "firebase.google.com",
  appwrite: "appwrite.io", deno: "deno.com", bun: "bun.sh",
  okta: "okta.com", auth0: "auth0.com", clerk: "clerk.com", workos: "workos.com", stytch: "stytch.com",
  fusionauth: "fusionauth.io", keycloak: "keycloak.org", authentik: "goauthentik.io",
  supertokens: "supertokens.com", logto: "logto.io", ory: "ory.sh",
  "1password": "1password.com", bitwarden: "bitwarden.com", dashlane: "dashlane.com", lastpass: "lastpass.com",
  keeper: "keepersecurity.com", keepersecurity: "keepersecurity.com", enpass: "enpass.io",
  roboform: "roboform.com", nordpass: "nordpass.com", proton: "proton.me", protonmail: "proton.me",
  google: "google.com", microsoft: "microsoft.com", apple: "apple.com", github: "github.com",
  gitlab: "gitlab.com", pingidentity: "pingidentity.com", sailpoint: "sailpoint.com", cyberark: "cyberark.com",
  duo: "duo.com", duosecurity: "duo.com", yubico: "yubico.com", authy: "authy.com", zitadel: "zitadel.com",
  casdoor: "casdoor.org", ente: "ente.io", hanko: "hanko.io", descope: "descope.com",
  crowdstrike: "crowdstrike.com", sentinelone: "sentinelone.com", paloaltonetworks: "paloaltonetworks.com",
  fortinet: "fortinet.com", wazuh: "wazuh.com", tailscale: "tailscale.com", wireguard: "wireguard.com",
  openvpn: "openvpn.net", nordvpn: "nordvpn.com", expressvpn: "expressvpn.com", surfshark: "surfshark.com",
  protonvpn: "protonvpn.com", snyk: "snyk.io", sonarqube: "sonarsource.com", qualys: "qualys.com",
  tenable: "tenable.com", rapid7: "rapid7.com", knowbe4: "knowbe4.com", keybase: "keybase.io",
  bitdefender: "bitdefender.com", kaspersky: "kaspersky.com", malwarebytes: "malwarebytes.com",
  norton: "norton.com", avast: "avast.com", avg: "avg.com", eset: "eset.com", trendmicro: "trendmicro.com",
  sophos: "sophos.com", mcafee: "mcafee.com", fsecure: "f-secure.com",
  postgresql: "postgresql.org", mysql: "mysql.com", mongodb: "mongodb.com", redis: "redis.io",
  clickhouse: "clickhouse.com", snowflake: "snowflake.com", googlebigquery: "cloud.google.com/bigquery",
  databricks: "databricks.com", cockroachlabs: "cockroachlabs.com", planetscale: "planetscale.com",
  neon: "neon.tech", turso: "turso.tech", xata: "xata.io", fauna: "fauna.com", timescale: "timescale.com",
  influxdb: "influxdata.com", meilisearch: "meilisearch.com", algolia: "algolia.com", typesense: "typesense.org",
  opensearch: "opensearch.org", neo4j: "neo4j.com", arangodb: "arangodb.com", apachecassandra: "cassandra.apache.org",
  scylladb: "scylladb.com", singlestore: "singlestore.com", materialize: "materialize.com", dbt: "getdbt.com",
  fivetran: "fivetran.com", airbyte: "airbyte.com", stitch: "stitchdata.com", redpanda: "redpanda.com",
  apachekafka: "kafka.apache.org", apachespark: "spark.apache.org", apacheairflow: "airflow.apache.org",
  prefect: "prefect.io", dagster: "dagster.io", metabase: "metabase.com", looker: "looker.com",
  tableau: "tableau.com", powerbi: "powerbi.microsoft.com", superset: "superset.apache.org",
  duckdb: "duckdb.org", sqlite: "sqlite.org", mariadb: "mariadb.org", couchbase: "couchbase.com",
  openai: "openai.com", anthropic: "anthropic.com", googlegemini: "deepmind.google", mistralai: "mistral.ai",
  cohere: "cohere.com", groq: "groq.com", replicate: "replicate.com", huggingface: "huggingface.co",
  togetherai: "together.ai", fireworksai: "fireworks.ai", perplexity: "perplexity.ai",
  stabilityai: "stability.ai", midjourney: "midjourney.com", ollama: "ollama.com", langchain: "langchain.com",
  llamaindex: "llamaindex.ai", pinecone: "pinecone.io", weaviate: "weaviate.io", qdrant: "qdrant.tech",
  milvus: "milvus.io", modal: "modal.com", runpod: "runpod.io", baseten: "baseten.co", scaleai: "scale.com",
  weightsandbiases: "wandb.ai", langsmith: "langchain.com", deepmind: "deepmind.google", cursor: "cursor.com",
  codeium: "codeium.com", tabnine: "tabnine.com", replit: "replit.com", elevenlabs: "elevenlabs.io",
  assemblyai: "assemblyai.com", deepgram: "deepgram.com", runway: "runwayml.com", suno: "suno.com",
  characterai: "character.ai", xai: "x.ai", nvidia: "nvidia.com", amd: "amd.com", intel: "intel.com",
  qualcomm: "qualcomm.com", tesla: "tesla.com", jina: "jina.ai", anyscale: "anyscale.com",
  openrouter: "openrouter.ai", portkey: "portkey.ai", litellm: "litellm.ai",
  stripe: "stripe.com", paypal: "paypal.com", square: "squareup.com", adyen: "adyen.com",
  braintree: "braintreepayments.com", wise: "wise.com", revolut: "revolut.com", monzo: "monzo.com",
  plaid: "plaid.com", ramp: "ramp.com", brex: "brex.com", mercury: "mercury.com", checkout: "checkout.com",
  mollie: "mollie.com", klarna: "klarna.com", affirm: "affirm.com", afterpay: "afterpay.com",
  razorpay: "razorpay.com", paystack: "paystack.com", flutterwave: "flutterwave.com", paddle: "paddle.com",
  lemonsqueezy: "lemonsqueezy.com", chargebee: "chargebee.com", recurly: "recurly.com", zuora: "zuora.com",
  coinbase: "coinbase.com", binance: "binance.com", kraken: "kraken.com", metamask: "metamask.io",
  walletconnect: "walletconnect.com", ripple: "ripple.com", venmo: "venmo.com", cashapp: "cash.app",
  tipalti: "tipalti.com", expensify: "expensify.com", xero: "xero.com", quickbooks: "quickbooks.intuit.com",
  freshbooks: "freshbooks.com", wave: "waveapps.com", chime: "chime.com", sofi: "sofi.com",
  robinhood: "robinhood.com", etrade: "etrade.com", schwab: "schwab.com", fidelity: "fidelity.com",
  vanguard: "vanguard.com", coinmarketcap: "coinmarketcap.com", coingecko: "coingecko.com",
  opensea: "opensea.io", uniswap: "uniswap.org", aave: "aave.com", compound: "compound.finance",
  ledger: "ledger.com", trezor: "trezor.io", bitpay: "bitpay.com", circle: "circle.com", block: "block.xyz",
  visa: "visa.com", mastercard: "mastercard.com", americanexpress: "americanexpress.com",
  discover: "discover.com", unionpay: "unionpayintl.com",
  notion: "notion.so", slack: "slack.com", zoom: "zoom.us", dropbox: "dropbox.com", box: "box.com",
  evernote: "evernote.com", obsidian: "obsidian.md", coda: "coda.io", airtable: "airtable.com",
  asana: "asana.com", trello: "trello.com", jira: "atlassian.com", confluence: "atlassian.com",
  clickup: "clickup.com", mondaydotcom: "monday.com", basecamp: "basecamp.com", height: "height.app",
  linear: "linear.app", wrike: "wrike.com", smartsheet: "smartsheet.com", miro: "miro.com",
  figma: "figma.com", framer: "framer.com", sketch: "sketch.com", invision: "invisionapp.com",
  canva: "canva.com", adobe: "adobe.com", lucid: "lucid.co", mural: "mural.co", discord: "discord.com",
  microsoftteams: "teams.microsoft.com", gmail: "gmail.com", outlook: "outlook.com",
  googledrive: "drive.google.com", googleworkspace: "workspace.google.com",
  googlecalendar: "calendar.google.com", todoist: "todoist.com", ticktick: "ticktick.com",
  roamresearch: "roamresearch.com", logseq: "logseq.com", bear: "bear.app", ulysses: "ulysses.app",
  zotero: "zotero.org", readwise: "readwise.io", pocket: "getpocket.com", instapaper: "instapaper.com",
  caldotcom: "cal.com", calendly: "calendly.com", savvycal: "savvycal.com", grammarly: "grammarly.com",
  otterai: "otter.ai", descript: "descript.com", loom: "loom.com", veed: "veed.io", capcut: "capcut.com",
  excalidraw: "excalidraw.com", whimsical: "whimsical.com", drawio: "drawio.com", zeplin: "zeplin.io",
  resend: "resend.com", sendgrid: "sendgrid.com", mailgun: "mailgun.com", postmark: "postmarkapp.com",
  mailchimp: "mailchimp.com", convertkit: "convertkit.com", buttondown: "buttondown.email",
  mailerlite: "mailerlite.com", klaviyo: "klaviyo.com", customerio: "customer.io", hubspot: "hubspot.com",
  salesforce: "salesforce.com", pipedrive: "pipedrive.com", intercom: "intercom.com", drift: "drift.com",
  crisp: "crisp.chat", front: "front.com", helpscout: "helpscout.com", zendesk: "zendesk.com",
  freshdesk: "freshdesk.com", freshworks: "freshworks.com", zoho: "zoho.com", zohomail: "zoho.com/mail",
  tutanota: "tuta.com", twilio: "twilio.com", messagebird: "messagebird.com", vonage: "vonage.com",
  telnyx: "telnyx.com", sinch: "sinch.com", bandwidth: "bandwidth.com", pusher: "pusher.com",
  ably: "ably.com", pubnub: "pubnub.com", sendbird: "sendbird.com", agora: "agora.io", daily: "daily.co",
  livekit: "livekit.io", mux: "mux.com", telegram: "telegram.org", whatsapp: "whatsapp.com",
  signal: "signal.org", googlemeet: "meet.google.com", webex: "webex.com", gotomeeting: "gotomeeting.com",
  ringcentral: "ringcentral.com", aircall: "aircall.io", dialpad: "dialpad.com",
  grasshopper: "grasshopper.com", fireflies: "fireflies.ai", gong: "gong.io", chorus: "chorus.ai",
  outreach: "outreach.io", salesloft: "salesloft.com", apollo: "apollo.io",
  googleanalytics: "analytics.google.com", posthog: "posthog.com", mixpanel: "mixpanel.com",
  amplitude: "amplitude.com", heap: "heap.io", segment: "segment.com", plausible: "plausible.io",
  fathom: "usefathom.com", matomo: "matomo.org", hotjar: "hotjar.com", fullstory: "fullstory.com",
  logrocket: "logrocket.com", smartlook: "smartlook.com", optimizely: "optimizely.com",
  launchdarkly: "launchdarkly.com", split: "split.io", statsig: "statsig.com", unleash: "getunleash.io",
  flagsmith: "flagsmith.com", growthbook: "growthbook.io", countly: "countly.com", appsflyer: "appsflyer.com",
  adjust: "adjust.com", braze: "braze.com", iterable: "iterable.com", onesignal: "onesignal.com",
  airship: "airship.com", moengage: "moengage.com", clevertap: "clevertap.com", webengage: "webengage.com",
  contentsquare: "contentsquare.com", chartmogul: "chartmogul.com", profitwell: "profitwell.com",
  baremetrics: "baremetrics.com", simpleanalytics: "simpleanalytics.com", umami: "umami.is",
  goatcounter: "goatcounter.com", snowplow: "snowplow.io", rudderstack: "rudderstack.com",
  mparticle: "mparticle.com", tealium: "tealium.com",
  shopify: "shopify.com", woocommerce: "woocommerce.com", bigcommerce: "bigcommerce.com",
  magento: "business.adobe.com", squarespace: "squarespace.com", wix: "wix.com", webflow: "webflow.com",
  ghost: "ghost.org", wordpress: "wordpress.org", drupal: "drupal.org", joomla: "joomla.org",
  medusa: "medusajs.com", saleor: "saleor.io", gumroad: "gumroad.com", fastspring: "fastspring.com",
  printful: "printful.com", printify: "printify.com", yotpo: "yotpo.com", recharge: "rechargepayments.com",
  etsy: "etsy.com", amazon: "amazon.com", ebay: "ebay.com", aliexpress: "aliexpress.com",
  alibaba: "alibaba.com", flipkart: "flipkart.com", rakuten: "rakuten.com", mercadolibre: "mercadolibre.com",
  shopee: "shopee.com", lazada: "lazada.com", wish: "wish.com", temu: "temu.com", shein: "shein.com",
  wayfair: "wayfair.com", instacart: "instacart.com", doordash: "doordash.com", ubereats: "ubereats.com",
  deliveroo: "deliveroo.com", justeat: "just-eat.com", grubhub: "grubhub.com", opentable: "opentable.com",
  trustpilot: "trustpilot.com",
  meta: "meta.com", facebook: "facebook.com", instagram: "instagram.com", threads: "threads.net",
  messenger: "messenger.com", x: "x.com", linkedin: "linkedin.com", reddit: "reddit.com",
  tiktok: "tiktok.com", snapchat: "snapchat.com", pinterest: "pinterest.com", tumblr: "tumblr.com",
  mastodon: "joinmastodon.org", bluesky: "bsky.app", youtube: "youtube.com", netflix: "netflix.com",
  spotify: "spotify.com", soundcloud: "soundcloud.com", twitch: "twitch.tv", steam: "steampowered.com",
  epicgames: "epicgames.com", playstation: "playstation.com", xbox: "xbox.com", nintendo: "nintendo.com",
  riotgames: "riotgames.com", electronicarts: "ea.com", ubisoft: "ubisoft.com", minecraft: "minecraft.net",
  roblox: "roblox.com", patreon: "patreon.com", substack: "substack.com", medium: "medium.com",
  devdotto: "dev.to", stackoverflow: "stackoverflow.com", hackernews: "news.ycombinator.com",
  producthunt: "producthunt.com", dribbble: "dribbble.com", behance: "behance.net", uber: "uber.com",
  lyft: "lyft.com", airbnb: "airbnb.com", bookingdotcom: "booking.com", tripadvisor: "tripadvisor.com",
  duolingo: "duolingo.com", strava: "strava.com", fitbit: "fitbit.com", garmin: "garmin.com",
  peloton: "onepeloton.com", headspace: "headspace.com", calm: "calm.com", myfitnesspal: "myfitnesspal.com",
  alltrails: "alltrails.com", komoot: "komoot.com", starlingbank: "starlingbank.com", n26: "n26.com",
  chase: "chase.com", bankofamerica: "bankofamerica.com", wellsfargo: "wellsfargo.com", hsbc: "hsbc.com",
  barclays: "barclays.co.uk", zelle: "zellepay.com",
};

// Cleaner display names for slugs that read badly in title case.
const extraDomains = {
  sourcegraph: "sourcegraph.com", codepen: "codepen.io", icloud: "icloud.com", monday: "monday.com",
  maven: "maven.apache.org", playwright: "playwright.dev", rollup: "rollupjs.org", vim: "vim.org",
  clojure: "clojure.org", java: "java.com", konami: "konami.com", sega: "sega.com",
  squareenix: "square-enix.com", olark: "olark.com", mailjet: "mailjet.com", grove: "grove.io",
  browserstack: "browserstack.com", argocd: "argoproj.github.io", chroma: "trychroma.com",
  alpinejs: "alpinejs.dev", craft: "craft.do", teleport: "goteleport.com",
  googleauthenticator: "google.com/authenticator", "microsoft-onedrive": "onedrive.live.com",
  returntype: "", builderio: "builder.io", "builder-io": "builder.io", kissmetrics: "kissmetrics.com",
  marvel: "marvelapp.com", rethinkdb: "rethinkdb.com", googleoptimize: "marketingplatform.google.com",
  oauth: "oauth.net", openid: "openid.net", webauthn: "webauthn.guide", jsonwebtokens: "jwt.io",
  fido: "fidoalliance.org", passkey: "fidoalliance.org", saml: "oasis-open.org",
  ssh: "openssh.com", vault: "hashicorp.com",
};
const names = {
  aws: "AWS", amazonaws: "AWS", google: "Google", microsoft: "Microsoft", apple: "Apple",
  github: "GitHub", gitlab: "GitLab", openai: "OpenAI", anthropic: "Anthropic", groq: "Groq",
  stripe: "Stripe", paypal: "PayPal", kubernetes: "Kubernetes", postgresql: "PostgreSQL",
  mysql: "MySQL", mongodb: "MongoDB", redis: "Redis", clickhouse: "ClickHouse", snowflake: "Snowflake",
  databricks: "Databricks", neon: "Neon", supabase: "Supabase", firebase: "Firebase", vercel: "Vercel",
  netlify: "Netlify", cloudflare: "Cloudflare", digitalocean: "DigitalOcean", heroku: "Heroku",
  docker: "Docker", terraform: "Terraform", grafana: "Grafana", prometheus: "Prometheus", sentry: "Sentry",
  datadog: "Datadog", pagerduty: "PagerDuty", okta: "Okta", auth0: "Auth0", clerk: "Clerk",
  workos: "WorkOS", stytch: "Stytch", keycloak: "Keycloak", "1password": "1Password",
  bitwarden: "Bitwarden", dashlane: "Dashlane", lastpass: "LastPass", proton: "Proton",
  protonmail: "Proton Mail", yubico: "Yubico", authy: "Authy", tailscale: "Tailscale",
  "nodedotjs": "Node.js", "nextdotjs": "Next.js", "vuedotjs": "Vue", "react": "React",
  typescript: "TypeScript", javascript: "JavaScript", python: "Python", rust: "Rust",
  go: "Go", java: "Java", kotlin: "Kotlin", swift: "Swift", php: "PHP", ruby: "Ruby",
  laravel: "Laravel", django: "Django", flask: "Flask", fastapi: "FastAPI", express: "Express",
  nestjs: "NestJS", spring: "Spring", dotnet: ".NET", elixir: "Elixir", haskell: "Haskell",
  jenkins: "Jenkins", circleci: "CircleCI", argocd: "Argo CD", snyk: "Snyk", sonarqube: "SonarQube",
  npm: "npm", yarn: "Yarn", pnpm: "pnpm", bun: "Bun", deno: "Deno", git: "Git",
  "flydotio": "Fly.io", "render": "Render", "railway": "Railway", "linode": "Akamai Linode",
  "newrelic": "New Relic", "honeycomb": "Honeycomb", "splunk": "Splunk", "elastic": "Elastic",
  "sumologic": "Sumo Logic", "opsgenie": "Opsgenie", "statuspage": "Statuspage",
  "betterstack": "Better Stack", "cloudinary": "Cloudinary", "imgix": "imgix",
  "backblaze": "Backblaze", "godaddy": "GoDaddy", "namecheap": "Namecheap", "fastmail": "Fastmail",
  "alibabacloud": "Alibaba Cloud", "tencentcloud": "Tencent Cloud", "microsoftazure": "Azure",
  "googlecloud": "Google Cloud", "oracle": "Oracle", "ibm": "IBM", "upcloud": "UpCloud",
  "crowdstrike": "CrowdStrike", "sentinelone": "SentinelOne", "paloaltonetworks": "Palo Alto Networks",
  "paloaltosoftware": "Palo Alto Networks", "fortinet": "Fortinet", "wazuh": "Wazuh",
  "wireguard": "WireGuard", "openvpn": "OpenVPN", "nordvpn": "NordVPN", "expressvpn": "ExpressVPN",
  "surfshark": "Surfshark", "protonvpn": "Proton VPN", "qualys": "Qualys", "tenable": "Tenable",
  "rapid7": "Rapid7", "knowbe4": "KnowBe4", "keybase": "Keybase", "bitdefender": "Bitdefender",
  "kaspersky": "Kaspersky", "malwarebytes": "Malwarebytes", "avast": "Avast", "avg": "AVG",
  "eset": "ESET", "trendmicro": "Trend Micro", "sophos": "Sophos", "mcafee": "McAfee",
  "fsecure": "F-Secure", "cyberark": "CyberArk", "sailpoint": "SailPoint", "pingidentity": "Ping Identity",
  "duo": "Duo", "casdoor": "Casdoor", "zitadel": "Zitadel", "hanko": "Hanko", "descope": "Descope",
  "ente": "Ente", "keepersecurity": "Keeper", "keeper": "Keeper", "enpass": "Enpass", "roboform": "RoboForm",
  "nordpass": "NordPass", "duosecurity": "Duo", "supertokens": "SuperTokens", "logto": "Logto",
  "fusionauth": "FusionAuth", "authentik": "Authentik", "ory": "Ory",
  "cockroachlabs": "CockroachDB", "planetscale": "PlanetScale", "timescale": "Timescale",
  "influxdb": "InfluxDB", "meilisearch": "Meilisearch", "algolia": "Algolia", "typesense": "Typesense",
  "opensearch": "OpenSearch", "neo4j": "Neo4j", "arangodb": "ArangoDB", "apachecassandra": "Cassandra",
  "scylladb": "ScyllaDB", "singlestore": "SingleStore", "materialize": "Materialize", "dbt": "dbt",
  "fivetran": "Fivetran", "airbyte": "Airbyte", "redpanda": "Redpanda", "apachekafka": "Apache Kafka",
  "apachespark": "Apache Spark", "apacheairflow": "Apache Airflow", "prefect": "Prefect",
  "dagster": "Dagster", "metabase": "Metabase", "looker": "Looker", "tableau": "Tableau",
  "powerbi": "Power BI", "superset": "Superset", "duckdb": "DuckDB", "sqlite": "SQLite",
  "mariadb": "MariaDB", "couchbase": "Couchbase", "xata": "Xata", "turso": "Turso", "fauna": "Fauna",
  "googlebigquery": "BigQuery", "materialize": "Materialize",
  "googlegemini": "Google Gemini", "mistralai": "Mistral AI", "cohere": "Cohere", "replicate": "Replicate",
  "huggingface": "Hugging Face", "togetherai": "Together AI", "fireworksai": "Fireworks AI",
  "perplexity": "Perplexity", "stabilityai": "Stability AI", "midjourney": "Midjourney",
  "langchain": "LangChain", "llamaindex": "LlamaIndex", "pinecone": "Pinecone", "weaviate": "Weaviate",
  "qdrant": "Qdrant", "chroma": "Chroma", "milvus": "Milvus", "modal": "Modal", "runpod": "RunPod",
  "baseten": "Baseten", "scaleai": "Scale AI", "weightsandbiases": "Weights & Biases", "langsmith": "LangSmith",
  "deepmind": "Google DeepMind", "cursor": "Cursor", "codeium": "Codeium", "tabnine": "Tabnine",
  "replit": "Replit", "elevenlabs": "ElevenLabs", "assemblyai": "AssemblyAI", "deepgram": "Deepgram",
  "runway": "Runway", "suno": "Suno", "characterai": "Character.AI", "xai": "xAI", "nvidia": "NVIDIA",
  "amd": "AMD", "intel": "Intel", "qualcomm": "Qualcomm", "tesla": "Tesla", "jina": "Jina AI",
  "anyscale": "Anyscale", "openrouter": "OpenRouter", "portkey": "Portkey", "litellm": "LiteLLM",
  "vllm": "vLLM", "adya": "Adyen", "adyen": "Adyen", "braintree": "Braintree", "wise": "Wise",
  "revolut": "Revolut", "monzo": "Monzo", "plaid": "Plaid", "ramp": "Ramp", "brex": "Brex",
  "mercury": "Mercury", "checkout": "Checkout.com", "mollie": "Mollie", "klarna": "Klarna",
  "affirm": "Affirm", "afterpay": "Afterpay", "razorpay": "Razorpay", "paystack": "Paystack",
  "flutterwave": "Flutterwave", "paddle": "Paddle", "lemonsqueezy": "Lemon Squeezy",
  "chargebee": "Chargebee", "recurly": "Recurly", "zuora": "Zuora", "coinbase": "Coinbase",
  "binance": "Binance", "kraken": "Kraken", "metamask": "MetaMask", "walletconnect": "WalletConnect",
  "ripple": "Ripple", "venmo": "Venmo", "cashapp": "Cash App", "tipalti": "Tipalti",
  "expensify": "Expensify", "xero": "Xero", "quickbooks": "QuickBooks", "freshbooks": "FreshBooks",
  "chime": "Chime", "sofi": "SoFi", "robinhood": "Robinhood", "etrade": "E*TRADE", "schwab": "Charles Schwab",
  "fidelity": "Fidelity", "vanguard": "Vanguard", "coinmarketcap": "CoinMarketCap", "coingecko": "CoinGecko",
  "opensea": "OpenSea", "uniswap": "Uniswap", "aave": "Aave", "compound": "Compound", "ledger": "Ledger",
  "trezor": "Trezor", "bitpay": "BitPay", "circle": "Circle", "block": "Block", "visa": "Visa",
  "mastercard": "Mastercard", "americanexpress": "American Express", "discover": "Discover",
  "unionpay": "UnionPay", "zelle": "Zelle",
  "notion": "Notion", "slack": "Slack", "zoom": "Zoom", "dropbox": "Dropbox", "box": "Box",
  "evernote": "Evernote", "obsidian": "Obsidian", "coda": "Coda", "airtable": "Airtable",
  "asana": "Asana", "trello": "Trello", "jira": "Jira", "confluence": "Confluence", "clickup": "ClickUp",
  "mondaydotcom": "monday.com", "basecamp": "Basecamp", "height": "Height", "linear": "Linear",
  "wrike": "Wrike", "smartsheet": "Smartsheet", "miro": "Miro", "figma": "Figma", "framer": "Framer",
  "sketch": "Sketch", "invision": "InVision", "canva": "Canva", "adobe": "Adobe", "lucid": "Lucid",
  "mural": "Mural", "discord": "Discord", "microsoftteams": "Microsoft Teams", "gmail": "Gmail",
  "outlook": "Outlook", "googledrive": "Google Drive", "googleworkspace": "Google Workspace",
  "googlecalendar": "Google Calendar", "todoist": "Todoist", "ticktick": "TickTick",
  "roamresearch": "Roam Research", "logseq": "Logseq", "bear": "Bear", "ulysses": "Ulysses",
  "zotero": "Zotero", "readwise": "Readwise", "pocket": "Pocket", "instapaper": "Instapaper",
  "caldotcom": "Cal.com", "calendly": "Calendly", "savvycal": "SavvyCal", "grammarly": "Grammarly",
  "otterai": "Otter.ai", "descript": "Descript", "loom": "Loom", "veed": "VEED", "capcut": "CapCut",
  "excalidraw": "Excalidraw", "whimsical": "Whimsical", "drawio": "draw.io", "zeplin": "Zeplin",
  "resend": "Resend", "sendgrid": "SendGrid", "mailgun": "Mailgun", "postmark": "Postmark",
  "mailchimp": "Mailchimp", "convertkit": "ConvertKit", "buttondown": "Buttondown", "mailerlite": "MailerLite",
  "klaviyo": "Klaviyo", "customerio": "Customer.io", "hubspot": "HubSpot", "salesforce": "Salesforce",
  "pipedrive": "Pipedrive", "intercom": "Intercom", "drift": "Drift", "crisp": "Crisp", "front": "Front",
  "helpscout": "Help Scout", "zendesk": "Zendesk", "freshdesk": "Freshdesk", "freshworks": "Freshworks",
  "zoho": "Zoho", "zohomail": "Zoho Mail", "tutanota": "Tuta", "twilio": "Twilio",
  "messagebird": "MessageBird", "vonage": "Vonage", "telnyx": "Telnyx", "sinch": "Sinch",
  "bandwidth": "Bandwidth", "pusher": "Pusher", "ably": "Ably", "pubnub": "PubNub",
  "sendbird": "Sendbird", "agora": "Agora", "daily": "Daily", "livekit": "LiveKit", "mux": "Mux",
  "telegram": "Telegram", "whatsapp": "WhatsApp", "signal": "Signal", "googlemeet": "Google Meet",
  "webex": "Webex", "gotomeeting": "GoTo Meeting", "ringcentral": "RingCentral", "aircall": "Aircall",
  "dialpad": "Dialpad", "grasshopper": "Grasshopper", "fireflies": "Fireflies.ai", "gong": "Gong",
  "chorus": "Chorus", "outreach": "Outreach", "salesloft": "SalesLoft", "apollo": "Apollo",
  "googleanalytics": "Google Analytics", "posthog": "PostHog", "mixpanel": "Mixpanel",
  "amplitude": "Amplitude", "heap": "Heap", "segment": "Segment", "plausible": "Plausible",
  "fathom": "Fathom", "matomo": "Matomo", "hotjar": "Hotjar", "fullstory": "FullStory",
  "logrocket": "LogRocket", "smartlook": "Smartlook", "optimizely": "Optimizely",
  "launchdarkly": "LaunchDarkly", "split": "Split", "statsig": "Statsig", "unleash": "Unleash",
  "flagsmith": "Flagsmith", "growthbook": "GrowthBook", "countly": "Countly", "appsflyer": "AppsFlyer",
  "adjust": "Adjust", "braze": "Braze", "iterable": "Iterable", "onesignal": "OneSignal",
  "airship": "Airship", "moengage": "MoEngage", "clevertap": "CleverTap", "webengage": "WebEngage",
  "contentsquare": "Contentsquare", "chartmogul": "ChartMogul", "profitwell": "ProfitWell",
  "baremetrics": "Baremetrics", "simpleanalytics": "Simple Analytics", "umami": "Umami",
  "goatcounter": "GoatCounter", "snowplow": "Snowplow", "rudderstack": "RudderStack",
  "mparticle": "mParticle", "tealium": "Tealium",
  "shopify": "Shopify", "woocommerce": "WooCommerce", "bigcommerce": "BigCommerce", "magento": "Magento",
  "squarespace": "Squarespace", "wix": "Wix", "webflow": "Webflow", "ghost": "Ghost",
  "wordpress": "WordPress", "drupal": "Drupal", "joomla": "Joomla", "medusa": "Medusa",
  "saleor": "Saleor", "gumroad": "Gumroad", "fastspring": "FastSpring", "printful": "Printful",
  "printify": "Printify", "yotpo": "Yotpo", "recharge": "Recharge", "etsy": "Etsy", "amazon": "Amazon",
  "ebay": "eBay", "aliexpress": "AliExpress", "alibaba": "Alibaba", "flipkart": "Flipkart",
  "rakuten": "Rakuten", "mercadolibre": "Mercado Libre", "shopee": "Shopee", "lazada": "Lazada",
  "wish": "Wish", "temu": "Temu", "shein": "SHEIN", "wayfair": "Wayfair", "instacart": "Instacart",
  "doordash": "DoorDash", "ubereats": "Uber Eats", "deliveroo": "Deliveroo", "justeat": "Just Eat",
  "grubhub": "Grubhub", "opentable": "OpenTable", "trustpilot": "Trustpilot",
  "meta": "Meta", "facebook": "Facebook", "instagram": "Instagram", "threads": "Threads",
  "messenger": "Messenger", "x": "X", "linkedin": "LinkedIn", "reddit": "Reddit", "tiktok": "TikTok",
  "snapchat": "Snapchat", "pinterest": "Pinterest", "tumblr": "Tumblr", "mastodon": "Mastodon",
  "bluesky": "Bluesky", "youtube": "YouTube", "netflix": "Netflix", "spotify": "Spotify",
  "soundcloud": "SoundCloud", "twitch": "Twitch", "steam": "Steam", "epicgames": "Epic Games",
  "playstation": "PlayStation", "xbox": "Xbox", "nintendo": "Nintendo", "riotgames": "Riot Games",
  "electronicarts": "EA", "ubisoft": "Ubisoft", "minecraft": "Minecraft", "roblox": "Roblox",
  "patreon": "Patreon", "substack": "Substack", "medium": "Medium", "devdotto": "DEV",
  "stackoverflow": "Stack Overflow", "hackernews": "Hacker News", "producthunt": "Product Hunt",
  "dribbble": "Dribbble", "behance": "Behance", "uber": "Uber", "lyft": "Lyft", "airbnb": "Airbnb",
  "bookingdotcom": "Booking.com", "tripadvisor": "Tripadvisor", "duolingo": "Duolingo",
  "strava": "Strava", "fitbit": "Fitbit", "garmin": "Garmin", "peloton": "Peloton",
  "headspace": "Headspace", "calm": "Calm", "myfitnesspal": "MyFitnessPal", "alltrails": "AllTrails",
  "komoot": "Komoot",
  apachesuperset: "Apache Superset", alpinejs: "Alpine.js", phoenixframework: "Phoenix",
  apachegroovy: "Apache Groovy", diagramsdotnet: "draw.io", "microsoft-onedrive": "OneDrive",
  tailwindcss: "Tailwind CSS", headlessui: "Headless UI", radixui: "Radix UI", shadcnui: "shadcn/ui",
  browserstack: "BrowserStack", saucelabs: "Sauce Labs", codesandbox: "CodeSandbox",
  stackblitz: "StackBlitz", codepen: "CodePen", jsfiddle: "JSFiddle", hashnode: "Hashnode",
  tauri: "Tauri", flutter: "Flutter", dart: "Dart", elm: "Elm", clojure: "Clojure", scala: "Scala",
  perl: "Perl", lua: "Lua", julia: "Julia", ocaml: "OCaml", erlang: "Erlang", zig: "Zig",
  crystal: "Crystal", preact: "Preact", htmx: "htmx", bootstrap: "Bootstrap", mui: "MUI",
  zapier: "Zapier", n8n: "n8n", retool: "Retool", appsmith: "Appsmith", budibase: "Budibase",
  redash: "Redash", mullvad: "Mullvad", startpage: "Startpage", qwant: "Qwant", ecosia: "Ecosia",
  adguard: "AdGuard", ublockorigin: "uBlock Origin", adblock: "AdBlock", googlechrome: "Chrome",
  duckduckgo: "DuckDuckGo", mozilla: "Mozilla", brave: "Brave", opera: "Opera", vivaldi: "Vivaldi",
  mattermost: "Mattermost", zulip: "Zulip", threema: "Threema", viber: "Viber", wechat: "WeChat",
  kakaotalk: "KakaoTalk", element: "Element", matrix: "Matrix", keybase: "Keybase",
  atlassian: "Atlassian", bitly: "Bitly", egnyte: "Egnyte", mega: "MEGA", tresorit: "Tresorit",
  icloud: "iCloud", medusa: "Medusa", brevo: "Brevo", mailjet: "Mailjet", sparkpost: "SparkPost",
  livechat: "LiveChat", olark: "Olark", grove: "Grove", samsung: "Samsung", sony: "Sony", lg: "LG",
  xiaomi: "Xiaomi", oneplus: "OnePlus", oppo: "OPPO", vivo: "vivo", motorola: "Motorola",
  nokia: "Nokia", ericsson: "Ericsson", siemens: "Siemens", bosch: "Bosch", huawei: "Huawei",
  sega: "Sega", konami: "Konami", squareenix: "Square Enix", activision: "Activision",
  rockstargames: "Rockstar Games", valve: "Valve", cdprojekt: "CD Projekt", ea: "EA",
  monday: "monday.com", plaid: "Plaid", googleoptimize: "Google Optimize", oauth: "OAuth",
  openid: "OpenID", webauthn: "WebAuthn", jsonwebtokens: "JSON Web Tokens", rethinkdb: "RethinkDB",
  "builder-io": "Builder.io", vault: "HashiCorp Vault",
 "starlingbank": "Starling Bank", "n26": "N26", "chase": "Chase",
  "bankofamerica": "Bank of America", "wellsfargo": "Wells Fargo", "hsbc": "HSBC", "barclays": "Barclays",
};


function lum(hex) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function plateFor(body, palette, color) {
  if (!palette) return "light";
  const fills = [...body.matchAll(/(?:fill|stop-color)="(#[0-9a-fA-F]{3,8})"/g)].map((m) => m[1]);
  const solid = fills.filter((f) => f.length !== 5 && f.length !== 9);
  if (!solid.length) return "light";
  const lights = solid.filter((f) => lum(f) > 0.78);
  return lights.length === solid.length ? "dark" : "light";
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/dot/g, "");

const siBySlug = new Map();
for (const key of Object.keys(si)) {
  const icon = si[key];
  if (icon && icon.slug) siBySlug.set(icon.slug, icon);
}

const looseIndex = new Map();
const addLoose = (slug, source) => {
  const key = norm(slug);
  if (!looseIndex.has(key)) looseIndex.set(key, []);
  looseIndex.get(key).push({ slug, source });
};
for (const slug of siBySlug.keys()) addLoose(slug, "simple-icons");
for (const slug of Object.keys(logos.icons)) addLoose(slug, "logos");
for (const slug of Object.keys(siPack.icons)) addLoose(slug, "simple-icons-pack");
for (const slug of Object.keys(devicon.icons)) addLoose(slug, "devicon");

function lookup(slug) {
  const candidates = [slug, slug.replace(/-/g, ""), slug.replace(/-icon$/, "")];
  for (const c of candidates) {
    if (siBySlug.has(c)) return { slug: c, source: "simple-icons", si: siBySlug.get(c) };
  }
  if (logos.icons[slug]) return { slug, source: "logos", pack: "logos" };
  for (const c of candidates) {
    if (siPack.icons[c]) return { slug: c, source: "simple-icons-pack", pack: "simple-icons-pack" };
    if (logos.icons[c]) return { slug: c, source: "logos", pack: "logos" };
    if (devicon.icons[c]) return { slug: c, source: "devicon", pack: "devicon" };
  }
  const loose = looseIndex.get(norm(slug));
  if (loose && loose.length) {
    const hit = loose.find((x) => x.source === "simple-icons") || loose[0];
    if (hit.source === "simple-icons") return { slug: hit.slug, source: "simple-icons", si: siBySlug.get(hit.slug) };
    return { slug: hit.slug, source: hit.source, pack: hit.source };
  }
  return null;
}

function bodyFor(hit) {
  if (hit.source === "simple-icons") {
    return { body: `<path d="${hit.si.path}"/>`, width: 24, height: 24, color: `#${hit.si.hex}`, palette: false };
  }
  const pack = hit.pack === "logos" ? logos : hit.pack === "devicon" ? devicon : siPack;
  const icon = pack.icons[hit.slug];
  const w = icon.width || pack.width || 24;
  const h = icon.height || pack.height || 24;
  const palette = Boolean(icon.parent ? false : pack.info && pack.info.palette !== false && /fill=/.test(icon.body));
  return { body: icon.body, width: w, height: h, color: null, palette };
}

function titleize(slug) {
  return slug
    .replace(/-icon$/, "")
    .split("-")
    .map((w) => (w.length <= 3 && !/^\d/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function domainFromSource(src) {
  if (!src) return "";
  try {
    const host = new URL(src).hostname.replace(/^www\./, "");
    if (/brandfetch|clearbit|logo|wikipedia|wikimedia|vectorlogo|seeklogo|iconify|fontawesome|flaticon/.test(host)) return "";
    if (/twitter\.com|x\.com|facebook\.com|instagram\.com|linkedin\.com|behance\.net|dribbble\.com/.test(host)) return "";
    return host;
  } catch {
    return "";
  }
}

mkdirSync(OUT, { recursive: true });
for (const f of existsSync(OUT) ? require("node:fs").readdirSync(OUT) : []) {
  rmSync(new URL(f, OUT), { force: true });
}

const skip = new Set(["oauth","openid","webauthn","jsonwebtokens","fido","passkey","saml","marvel","kissmetrics","rethinkdb","googleoptimize","postmates"]);
const seen = new Set();
let resolved = [];
const missing = [];

for (const [category, baseList] of Object.entries(groups)) {
  const list = baseList.concat(extras[category] || []);
  for (const candidate of list) {
    if (seen.has(candidate) || skip.has(candidate)) continue;
    const hit = lookup(candidate);
    if (!hit) { missing.push(`${category}: ${candidate}`); continue; }
    if (seen.has(hit.slug)) continue;
    seen.add(candidate);
    seen.add(hit.slug);
    const art = bodyFor(hit);
    const name = names[candidate] || names[hit.slug] || (hit.si ? hit.si.title : titleize(hit.slug));
    const domain = domains[candidate] || domains[hit.slug] || extraDomains[candidate] || extraDomains[hit.slug] || (hit.si ? domainFromSource(hit.si.source) : "");
    const slug = hit.slug;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" role="img" aria-label="${name}">${art.body}</svg>`;
    writeFileSync(new URL(`${slug}.svg`, OUT), svg + "\n");
    resolved.push({
      slug,
      name,
      domain,
      category,
      source: hit.source,
      color: art.color,
      palette: art.palette,
      plate: plateFor(art.body, art.palette, art.color),
      viewBox: `0 0 ${art.width} ${art.height}`,
      body: art.body,
    });
  }
}

const byName = new Set();
const unique = [];
for (const b of resolved) {
  const key = b.name.toLowerCase();
  if (byName.has(key)) continue;
  byName.add(key);
  unique.push(b);
}
resolved = unique;
resolved.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(JSON_OUT, JSON.stringify({ generated: "bundled icon packs", count: resolved.length, brands: resolved }, null, 0));
writeFileSync(
  INLINE_OUT,
  `// Generated. Inline logos for the mockups.\nexport const brands = ${JSON.stringify(
    Object.fromEntries(resolved.map((b) => [b.slug, { name: b.name, color: b.color, palette: b.palette, plate: b.plate, viewBox: b.viewBox, body: b.body }]))
  )};\n`
);

const byCat = {};
for (const b of resolved) byCat[b.category] = (byCat[b.category] || 0) + 1;
console.log("resolved", resolved.length);
console.log(byCat);
console.log("missing", missing.length);
console.log(missing.join("\n"));
