locals {
  region = "eu-east-2"
  azs    = ["${local.region}a", "${local.region}b", "${local.region}c"]
}