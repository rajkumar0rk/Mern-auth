FROM node:24-alpine

RUN addgroup -S appgroup
RUN adduser -S appuser -G appgroup -D

WORKDIR /app

RUN chown -R appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup package*.json .
RUN npm ci --only=production

COPY --chown=appuser:appgroup . .
RUN npm run build

EXPOSE 3000

ENV PORT=3000

ENTRYPOINT ["npm","start"]

