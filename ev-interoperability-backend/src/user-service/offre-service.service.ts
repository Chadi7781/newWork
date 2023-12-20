// src/offre/offre.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Offre } from "src/users/schemas/offre.schema";
import { User, UserDocument } from "src/users/schemas/users.schema";

// ... (previously defined imports)

@Injectable()
export class OffreService {
  constructor(
    @InjectModel(Offre.name) private readonly offreModel: Model<Offre>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createOffre(
    username: string,
    offreData: Partial<Offre>
  ): Promise<Offre> {
    // Ensure the user exists
    console.log("hii");
    const existingUser = await this.userModel.findOne({
      username: username,
    });
    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    // Assign the user to the offre
    const newOffre = new this.offreModel({
      ...offreData,
      user: existingUser._id,
    });

    // Save and return the created offre
    return newOffre.save();
  }

  async getAllOffres(): Promise<Offre[]> {
    return this.offreModel.find().exec();
  }

  async getOffreById(id: string): Promise<Offre> {
    const offre = await this.offreModel.findById(id).exec();
    if (!offre) {
      throw new NotFoundException("Offre not found");
    }
    return offre;
  }

  async updateOffre(id: string, offreData: Partial<Offre>): Promise<Offre> {
    const updatedOffre = await this.offreModel
      .findByIdAndUpdate(id, offreData, { new: true })
      .exec();

    if (!updatedOffre) {
      throw new NotFoundException("Offre not found");
    }

    return updatedOffre;
  }
  async getOffresByUser(userId: string): Promise<Offre[]> {
    // Find all offers where the user field matches the provided userId

    const userIdObject = new mongoose.Types.ObjectId(userId);

    const userOffers = await this.offreModel
      .find({ user: userIdObject })
      .exec();

    console.log(userOffers);
    // If no offers are found, throw a NotFoundException
    if (!userOffers || userOffers.length === 0) {
      throw new NotFoundException("No offers found for the user");
    }

    // Return the array of offers
    return userOffers;
  }

  async deleteOffre(id: string): Promise<void> {
    const result = await this.offreModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("Offre not found");
    }
  }

  async countUserOffres(userId: string): Promise<number> {
    const count = await this.offreModel.countDocuments({ user: userId }).exec();
    return count;
  }
}
