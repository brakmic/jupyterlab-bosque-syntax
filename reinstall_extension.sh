#!/usr/bin/env bash

# Stop running instances
jupyter lab stop

# Clean build files
jupyter lab clean

# Remove extension
pip uninstall -y jupyterlab_bosque_syntax

# Clear pip cache
pip cache purge

# Remove old build artifacts
rm -rf lib
rm -rf jupyterlab_bosque_syntax/labextension

# Rebuild from scratch
jlpm clean:all
jlpm build:prod
pip install -e .
jupyter lab build
