#!/bin/bash

ibmcloud cf push DataDogApp --no-start -b https://github.com/cloudfoundry/binary-buildpack.git
ibmcloud cf v3-push DataDogApp -b https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip -b https://github.com/cloudfoundry/nodejs-buildpack.git