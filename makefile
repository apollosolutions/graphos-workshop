deploy-products:
	gcloud builds submit --config ./deploy/products.yaml

deploy-orders:
	gcloud builds submit --config ./deploy/orders.yaml
