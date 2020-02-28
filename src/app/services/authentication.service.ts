import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;
  private uid: string;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user && user.emailVerified) {
          this.setUid(user.uid);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else if (user && user.isAnonymous) {
          var anonymousUser: User = {};
          anonymousUser.uid = user.uid;
          return of(anonymousUser);
        }
        else {
          // Logged out
          return of(null);
        }
      })
    )

  }

  async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
    const credential = await this.afAuth.auth.getRedirectResult();
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl ? user.photoUrl : '',
      phone: user.phone ? user.phone : ''
    }

    return userRef.set(data, { merge: true })

  }

  async register(newUser: User) {
    const r = await this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
    this.afAuth.auth.useDeviceLanguage();
    await r.user.sendEmailVerification();
    newUser.uid = r.user.uid;
    return this.updateUserData(newUser);
  }

  async signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async signInAnonymously() {
    return this.afAuth.auth.signInAnonymously();
  }

  setUid(uid: string): void {
    this.uid = uid;
  }

  getUid(): string {
    return this.uid;
  }

  async signOut() {
    this.setUid('');
    await this.afAuth.auth.signOut();
    // this.router.navigate(['/']);
  }

  async resetPassword(email) {
    this.afAuth.auth.useDeviceLanguage();
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
