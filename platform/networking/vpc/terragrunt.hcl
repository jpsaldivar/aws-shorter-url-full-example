terraform {
  source = "git::https://github.com/terraform-aws-modules/terraform-aws-vpc.git//${local.this.module}?ref=${local.this.version}"
}

include {
  path = "${find_in_parent_folders()}"
}

locals {

  this                    = yamldecode(file("${get_terragrunt_dir()}/vars.yaml"))
  all_envs                = yamldecode(file("${get_terragrunt_dir()}../../../all_envs.yaml"))
  common_vars             = yamldecode(file("${get_terragrunt_dir()}../../../common_vars.yaml"))

}

inputs = merge(
  local.this,
  local.common_vars,
  local.all_envs
)
