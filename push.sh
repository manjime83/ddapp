#!/bin/bash

npm run build
ibmcloud cf push DataDogApp --vars-file vars.yaml
# ibmcloud cf push DataDogApp --no-start -b binary_buildpack --vars-file vars.yaml
# ibmcloud cf v3-push DataDogApp -b https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip -b sdk-for-nodejs