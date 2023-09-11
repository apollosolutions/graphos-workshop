include .env

# Deploy to GCloud
deploy-products:
	gcloud builds submit --config ./deploy/products.yaml

deploy-orders:
	gcloud builds submit --config ./deploy/orders.yaml

deploy-customers:
	gcloud builds submit --config ./deploy/customers.yaml

deploy-router:
	echo "Running Google Cloud Build" && \
	gcloud builds submit --substitutions=_APOLLO_KEY=${APOLLO_KEY},_APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF} \
	--config ./router/cloudbuild.yaml

deploy-website:
	echo "Deploying Front-End Website" && \
	gcloud builds submit --config ./final/website/cloudbuild.yaml

deploy-contract:
	echo "Running Google Cloud Build" && \
	gcloud builds submit --substitutions=_APOLLO_KEY=${APOLLO_KEY},_APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF} \
	--config ./router/contract.yaml

# Publish Schema to Apollo Studio
publish-products:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./final/nosql-products/schema.graphql \
  	--name products --routing-url https://subgraph-products-j3nprurqka-ue.a.run.app

publish-orders:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./final/rest-orders/schema.graphql \
  	--name orders --routing-url https://subgraph-orders-j3nprurqka-ue.a.run.app

publish-customers:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./final/sql-customers/schema.graphql \
  	--name customers --routing-url https://subgraph-customers-j3nprurqka-ue.a.run.app

check:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph check  --name orders $(APOLLO_GRAPH_REF) --schema ./rest-orders/schema.graphql

delete-users:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph delete --name orders $(APOLLO_GRAPH_REF)

test-router-local:
	APOLLO_KEY=$(APOLLO_KEY) APOLLO_GRAPH_REF=$(APOLLO_GRAPH_REF) ./router/router --config ./router/router.yaml
