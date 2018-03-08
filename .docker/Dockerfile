FROM node:6-slim

# Update
RUN apt-get update && apt-get install -y git --no-install-recommends

# Build Arguments
ARG workdir

# Working Directory
WORKDIR ${workdir}

# NPM
COPY package.json ${workdir}/
RUN npm install --unsafe-perm
COPY server.js ${workdir}/

# Add the core application directories
COPY modules modules
EXPOSE 3000
CMD ["node", "server.js"]
