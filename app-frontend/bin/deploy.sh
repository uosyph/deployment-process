aws s3 cp --recursive --acl public-read ./src s3://random-yousef-bucket/
aws s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./index.html s3://random-yousef-bucket/