import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LinkResponseDTO } from "src/dtos/linkResponse.dto";
import { Link } from "src/entities/link.entity";
import { AbstractCrudHandler } from "src/utils/abstract-crud-handler.service";

@Injectable()
export class LinkService extends AbstractCrudHandler<Link> {

    constructor(
        @InjectModel(Link.name)
        protected linkModel: Model<Link>,
      ) {
        super(linkModel);
      }

    protected mapEntityToDto(record: Link): LinkResponseDTO {
        const res = new LinkResponseDTO();
        res.id = record._id.toHexString();
        res.code = record.code;
        res.lastAccess = record.lastAccess;
        res.url = record.url;
        res.newUrl = record.newUrl;
        res.count = record.count;
        res.createdAt = record.createdAt;
        res.updatedAt = record.updatedAt;
        return res;
    }

      
}
  