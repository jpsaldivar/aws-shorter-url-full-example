locals {

  all_envs                = yamldecode(file("all_envs.yaml"))
  common_vars             = yamldecode(file("common_vars.yaml"))

}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket = "jpsr-iac-state"
    region = "us-east-2"
    #prefix = "${local.all_envs.project_folder}/${local.all_envs.project_name}/${local.common_vars.env}/${path_relative_to_include()}"
    dynamodb_table = "my-lock-table"
    key = "${local.all_envs.project_folder}/${local.all_envs.project_name}/${local.common_vars.env}/${path_relative_to_include()}/terraform.tfstate"

  }
}