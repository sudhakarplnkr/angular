import {
  BookingViewModel, UpdateBookingViewModel, SummaryTripRequest, Result_List_TripInfoViewModel__
} from 'src/api-client/booking/api-types';
import { BookingSummary_Response, BookingSummary } from 'src/api-client/booking/modules/Trip';
import { CreateBooking, UpdateBooking } from 'src/api-client/booking/modules/Booking';
import { Injectable } from '@angular/core';

export interface IBookingService1 {
  get(summaryTripRequest: SummaryTripRequest): Promise<BookingSummary_Response>;
}

export class BookingService1 implements IBookingService1 {
  get(summaryTripRequest: SummaryTripRequest): Promise<BookingSummary_Response> {
    return BookingSummary({ summaryTripRequest });
  }
}

export interface IBookingService2 {
  save: (bookingViewModel: BookingViewModel) => Promise<boolean>;
  updateBooking: (updateBookingViewModel: UpdateBookingViewModel) => Promise<boolean>;
}

export class BookingService2 implements IBookingService2 {
  save(bookingViewModel: BookingViewModel): Promise<boolean> {
    return CreateBooking({ bookingViewModel });
  }

  updateBooking(updateBookingViewModel: UpdateBookingViewModel): Promise<boolean> {
    return UpdateBooking({ updateBookingViewModel });
  }
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}

@Injectable({
  providedIn: 'root'
})
export class BookingServiceContract implements IBookingService1, IBookingService2 {
  get: (summaryTripRequest: SummaryTripRequest) => Promise<Result_List_TripInfoViewModel__>;
  save: (bookingViewModel: BookingViewModel) => Promise<boolean>;
  updateBooking: (updateBookingViewModel: UpdateBookingViewModel) => Promise<boolean>;
}

applyMixins(BookingServiceContract, [BookingService1, BookingService2]);
