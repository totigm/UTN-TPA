import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Paso 1: Creamos un ECS Fargate cluster.
const cluster = new awsx.ecs.Cluster("cluster");

// Paso 2: Definimos la conexion para nuestro servicio.
const alb = new awsx.lb.ApplicationLoadBalancer(
    "net-lb", { external: true, securityGroups: cluster.securityGroups });
const web = alb.createListener("web", { port: 80, external: true });

// Paso 3: Creamos y publicamos una imagen de Docker a un registro ECR privado.
const img = awsx.ecs.Image.fromPath("app-img", "./app");

// Paso 4: Creamos un servicio Fargate que podemos poner a escala.
const appService = new awsx.ecs.FargateService("app-svc", {
    cluster,
    taskDefinitionArgs: {
        container: {
            image: img,
            cpu: 102 /*10% of 1024*/,
            memory: 50 /*MB*/,
            portMappings: [ web ],
        },
    },
    desiredCount: 5,
});

// Paso 5: Exporta la URL del servicio.
export const url = web.endpoint.hostname;
