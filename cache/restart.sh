#!/usr/bin/env bash

BaseDir=$(dirname "$0")

${BaseDir}/redis-5.0.5/src/redis-cli shutdown
${BaseDir}/redis-5.0.5/src/redis-server --daemonize yes