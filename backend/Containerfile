ARG IMAGE_BUILD
ARG IMAGE_BUILD_TAG=latest
ARG IMAGE_RUN
ARG IMAGE_RUN_TAG=latest
FROM ${IMAGE_BUILD}:${IMAGE_BUILD_TAG} AS builder
WORKDIR /deployments
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM ${IMAGE_RUN}:${IMAGE_RUN_TAG} AS runner
WORKDIR /deployments

COPY --from=builder /deployments/dependencies/ ./
COPY --from=builder /deployments/snapshot-dependencies/ ./
COPY --from=builder /deployments/spring-boot-loader/ ./
COPY --from=builder /deployments/application/ ./

USER root
RUN microdnf update -y && \
    microdnf install -y fontconfig dejavu-sans-fonts freetype freetype-devel libtasn1 openssl --setopt=install_weak_deps=0 --setopt=keepcache=0 && \
    microdnf clean all && \
    rm -rf /var/cache/yum

USER default

#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
