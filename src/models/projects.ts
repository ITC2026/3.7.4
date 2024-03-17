import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { type Optional } from "sequelize";
import { Position } from "./positions";

interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  company: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

@Table({
  tableName: "Projects",
})
export class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  getPositions(): Promise<Position[]> {
    return Position.findAll({
      where: {
        id_project: this.id,
      },
    });
  }
  @Column
  id_project!: number;

  @Column
  title_project!: string;

  @Column
  description_project!: string;

  @Column
  tariff_project!: string;

  @CreatedAt
  publicationDate_project!: Date;

  @UpdatedAt
  deadline_project!: Date;

  //TODO: Add this functionality.
  /* 
  @ForeignKey (() => Client)
  @Column
  client_id!: number;
  */

  @HasMany(() => Position)
  positions!: Position[];

  @Column
  project_status!: number;
}
