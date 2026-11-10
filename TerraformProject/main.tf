terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 4.2.0"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "nginx" {
  name         = var.image_name
  keep_locally = true
}

resource "docker_container" "nginx1" {
  name  = "terraform-nginx-1"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = var.port1
  }
}

resource "docker_container" "nginx2" {
  name  = "terraform-nginx-2"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = var.port2
  }
}