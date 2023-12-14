terraform {
  #source = "git::https://github.com/terraform-aws-modules/terraform-aws-alb.git//${local.this.module}?ref=${local.this.version}"
  source = "${get_terragrunt_dir()}../../../../modules//aws_alb"
}

include {
  path = "${find_in_parent_folders()}"
}

locals {

  this                    = yamldecode(file("${get_terragrunt_dir()}/vars.yaml"))
  all_envs                = yamldecode(file("${get_terragrunt_dir()}../../../../all_envs.yaml"))
  common_vars             = yamldecode(file("${get_terragrunt_dir()}../../../../common_vars.yaml"))

}

dependency "vpc" {
  config_path  = "../../../networking/vpc"
  mock_outputs_allowed_terraform_commands = ["init", "validate", "plan"]
  mock_outputs = {
    vpc_id                 = "some_id"
    vpc_public_subnets_ids = ["some-id"]
  }
  #skip_outputs = true
}

inputs = merge(
  local.this,
  local.common_vars,
  local.all_envs
)
